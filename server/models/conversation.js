var mongoose = require('mongoose');

var ConversationSchema = new mongoose.Schema({
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  hasUnreadMessages: { type: Boolean, default: false },
  lastModificationDate: { type: Date, default: Date.now }
});

Conversation = mongoose.model('Conversation', ConversationSchema);
