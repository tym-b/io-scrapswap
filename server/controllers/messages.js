var mongoose = require('mongoose');
var tools = require('lodash');
var Message = mongoose.model('Message');
var Conversation = mongoose.model('Conversation');
var messagingSystem = require('../services/messagingSystem.js');
var webSockets = require('../config/webSockets');

exports.send = function(req, res) {
    if (req.user) {
        const reqBody = Object.assign(req.body, {sender: req.user._id});
        messagingSystem.createMessage(reqBody, successMessage, errorMessage);

        function successMessage(message) {
            messagingSystem.getOrCreateConversation(reqBody, successConv, errorConv);

            function successConv(conversation) {
                conversation.messages.push(message._id);
                conversation.lastMessage = message._id;
                conversation.hasUnreadMessages = true;
                conversation.lastModificationDate = Date.now();

                conversation.save(function(err) {
                    if (!err) {
                        webSockets.sendMessage(message);
                        res.send(message);
                    } else {
                        message.remove();
                        conversation.remove();
                        errorMessage(err);
                    }
                });
            }

            function errorConv(err) {
                message.remove();
                errorMessage(err);
            }
        }

        function errorMessage(err) {
            console.log("\n--- Error in messages.send ---", err);
            res.status(400).send("Wystąpił problem z wysłaniem wiadomości");
        }
    } else {
        console.log("\n--- No permission to send message ---");
        res.status(400).send("No permission to send message");
    }
};



exports.all = function(req, res) {
    if (req.user) {
        messagingSystem.getUserConversations(req.user, success, error);

        function success(user) {
            res.send(user);
        }

        function error(err) {
            res.status(400).send(err);
        }
    } else {
        console.log("\n--- No permission to get all conversations ---");
        res.status(400).send("No permission to get all conversations");
    }
};



exports.one = function(req, res) {
    if (req.user) {
        messagingSystem.getConversationById(req.params.id, success, error);

        function success(user) {
            res.send(user);
        }

        function error(err) {
            res.status(400).send(err);
        }
    } else {
        console.log("\n--- No permission to get conversation ---");
        res.status(400).send("No permission to get conversation");
    }
};
