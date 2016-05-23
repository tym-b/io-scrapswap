var mongoose = require('mongoose');

var AdvertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: { type: String, required: true },
  location: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  date: { type: Date, default: Date.now },
  mainImage: String,
  images: [{ _id: false, url: String}]
});

Advert = mongoose.model('Advert', AdvertSchema);
