const API_URL = 'http://localhost:5001/api/movies';

// Получить все фильмы
export const getMovies = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// Добавить новый фильм
export const addMovie = async (movie) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to add movie');
    return await response.json();
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};
