const express = require('express');
const Movie = require('../models/movie');
const router = express.Router();

// Получить все фильмы
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies', error: err });
  }
});

// Добавить новый фильм
router.post('/', async (req, res) => {
  const { title, genre, releaseDate, description } = req.body;

  const newMovie = new Movie({
    title,
    genre,
    releaseDate,
    description,
  });

  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: 'Error adding movie', error: err });
  }
});

module.exports = router;
