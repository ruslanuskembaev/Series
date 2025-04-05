// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Middleware для проверки роли администратора
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decoded.id).then((user) => {
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Добавление нового фильма (доступно только администратору)
router.post('/movies', isAdmin, async (req, res) => {
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

// Удаление фильма (доступно только администратору)
router.delete('/movies/:id', isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting movie', error: err });
  }
});

module.exports = router;
