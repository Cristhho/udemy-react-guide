import React, { useState, useEffect } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import useHttp from './hooks/use-http';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);
  const { isLoading, error, sendRequest: fetchMovies } = useHttp();

  useEffect(() => {
    const transformMovies = (data) => {
      const loadedMovies = [];
  
      for (const movie in data) {
        loadedMovies.push({
          id: movie,
          title: data[movie].title,
          openingText: data[movie].openingText,
          releaseDate: data[movie].releaseDate,
        });
      }
      setMovies(loadedMovies);
    };
    fetchMovies({
      url: 'https://react-burger-app-bb.firebaseio.com/movies.json',
    }, transformMovies);
  }, [fetchMovies]);

  async function addMovieHandler(movie) {
    const response = await fetch('https://react-burger-app-bb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    fetchMovies();
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Movies list is empty</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
