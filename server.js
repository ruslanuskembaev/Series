// Импортируем зависимости
const express = require('express');
const cors = require('cors');

// Создаем приложение Express
const app = express();

// Настройка CORS
// Это разрешит доступ с любых источников. Если хотите более строгую настройку, укажите конкретные домены.
app.use(cors({
  origin: 'http://localhost:3000'  // Разрешить доступ только с этого порта
}));
// Простой маршрут для теста
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Устанавливаем порт для сервера
const PORT = process.env.PORT || 5000;

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
