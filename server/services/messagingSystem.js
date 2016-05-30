var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Conversation = mongoose.model('Conversation');
var User = mongoose.model('User');
var _this = this;


function addConversationToUsers(conversation, successCal, errorCal) {
    var query = {
        _id: {
            $in: conversation.members
        }
    };

    var data = {
        $push: {
            conversations: conversation._id
        }
    };

    User.update(query, data, {
        multi: true
    }, function(err, num) {
        if (!err) {
            successCal(conversation);
        } else {
            errorCal(err);
        }
    });
}

exports.createConversation = function(data, successCal, errorCal) {
    var conversationBody = {
        members: [
            data.sender,
            data.recipient
        ]
    };

    Conversation.create(conversationBody, function(err, newConversation) {
        if (!err) {
            if (newConversation) {
                addConversationToUsers(newConversation, successCal, errorCal);
            } else {
                errorCal("Null new conversation");
            }
        } else {
            errorCal(err);
        }
    });
}



exports.createMessage = function(data, successCal, errorCal) {
    var messageBody = {
        text: data.text,
        sender: mongoose.Types.ObjectId(data.sender)
    };

    Message.create(messageBody, function(err, newMessage) {
        if (!err) {
            if (newMessage) {
                console.log("Wiadomosc stworzona");
                successCal(newMessage);
            } else {
                errorCal("Null new message");
            }
        } else {
            console.log("Wiadomosc blad");
            errorCal(err);
        }
    });
}



exports.getOrCreateConversation = function(data, successCal, errorCal) {
    var query = {
        members: {
            $all: [
                data.sender,
                data.recipient
            ]
        }
    };

    Conversation.findOne(query).exec(function(err, conversation) {
        if (!err) {
            if (conversation) {
                successCal(conversation);
            } else {
                _this.createConversation(data, successCal, errorCal);
            }
        } else {
            errorCal(err);
        }
    });
}



exports.getUserConversations = function(user, successCal, errorCal) {
    var query = {
        _id: {
            $in: user.conversations
        }
    };

    Conversation.find(query).sort('lastModificationDate').lean().populate('lastMessage').populate('members').exec(function(err, conversations) {
        if (!err) {
            successCal(conversations);
        } else {
            errorCal(err);
        }
    });
}



exports.getConversationById = function(conversationID, successCal, errorCal) {
    var query = {
        _id: conversationID
    };

    Conversation.findOne(query).lean().populate('messages').populate('lastMessage').populate('members').exec(function(err, conversation) {
        if (!err) {
            successCal(conversation);
        } else {
            errorCal(err);
        }
    });
}
