const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  available: Boolean, default: true
});

module.exports = mongoose.model('Book', bookSchema);