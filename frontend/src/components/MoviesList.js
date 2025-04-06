import React, { useState, useEffect } from 'react';

const MoviesList = () => {
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

  return (
    <div>
      <h2>Movies List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
