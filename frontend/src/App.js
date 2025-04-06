// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import AddMovie from './components/AddMovie';
import DeleteMovie from './components/DeleteMovie';
import UserProfile from './components/UserProfile';  // Подключаем компонент профиля

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5001/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  useEffect(() => {
    // Получение списка фильмов, если пользователь авторизован
    if (user) {
      fetch('http://localhost:5001/api/movies', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMovies(data)) // Устанавливаем список фильмов
        .catch((error) => console.error('Error fetching movies:', error));
    }
  }, [user]);

  return (
    <div>
      <h1>Movie App</h1>

      {/* Добавляем проверку на наличие пользователя */}
      {user ? (
        <>
          <UserProfile /> {/* Компонент профиля пользователя */}
          <p>Welcome, {user.email}!</p>
          
          {/* Панель администратора только для админа */}
          {user.role === 'admin' && (
            <>
              <h2>Admin Panel</h2>
              <AddMovie />
              <DeleteMovie />
            </>
          )}

          {/* Список фильмов */}
          <h2>Movies List</h2>
          {movies.length > 0 ? (
            <ul>
              {movies.map((movie) => (
                <li key={movie._id}>
                  {movie.title} ({movie.releaseDate})
                </li>
              ))}
            </ul>
          ) : (
            <p>No movies available</p>
          )}
        </>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}

export default App;
