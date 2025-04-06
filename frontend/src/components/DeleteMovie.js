// frontend/src/components/DeleteMovie.js
import React, { useState, useEffect } from 'react';

const DeleteMovie = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5001/api/movies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error('Error fetching movies:', error));
    }
  }, []);

  const handleDelete = async (movieId) => {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:5001/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      alert('Movie deleted successfully!');
      setMovies(movies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <div>
      <h2>Delete Movie</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title}
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteMovie;
