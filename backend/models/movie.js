const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required'],
  },
  description: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
