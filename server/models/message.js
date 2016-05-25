var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now }
});

Message = mongoose.model('Message', MessageSchema);
