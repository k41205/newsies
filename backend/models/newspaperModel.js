const mongoose = require('mongoose');

const newspaperSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A paper must have a name'],
    index: true,
    unique: true,
  },
  image: { type: String, required: [true, 'A paper must have an image'] },
  link: { type: String, required: [true, 'A paper must have a link'] },
  abstract: { type: String, required: [true, 'A paper must have an abstract'] },
  publisher: {
    type: Object,
    required: [true, 'A paper must have a publisher'],
  },
  languages: {
    type: [String],
    required: [true, 'A paper must have at least one language'],
  },
  creation_date: { type: Date, default: Date.now() },
});

const Newspaper = mongoose.model('Newspaper', newspaperSchema);

module.exports = Newspaper;
