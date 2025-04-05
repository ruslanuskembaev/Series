const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Загружаем переменные окружения

const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Middleware
app.use(cors());
app.use(express.json()); // Для парсинга JSON тела запросов

// Импортируем маршруты
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');  // Маршруты аутентификации

app.use('/api/movies', movieRoutes);  // Настроили маршруты для фильмов
app.use('/api/auth', authRoutes);    // Настроили маршруты для аутентификации

// Пример маршрута для корневого пути "/"
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Запуск сервера
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
