var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    }
});

Category = mongoose.model('Category', CategorySchema);
