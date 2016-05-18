var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

Category = mongoose.model('Category', CategorySchema);
