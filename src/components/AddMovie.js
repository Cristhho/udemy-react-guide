import React, { useRef } from 'react';

import classes from './AddMovie.module.css';
import useHttp from '../hooks/use-http';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  const { isLoading, error, sendRequest: sendMovieRequest } = useHttp();

  const createMovie = (movie, data) => {
    const generatedId = data.name;
    const createdMovie = {
      id: generatedId,
      title: movie.title,
      openingText: movie.openingText,
      releaseDate: movie.releaseDate,
    };
    props.onAddMovie(createdMovie);
  }

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    sendMovieRequest({
      url: 'https://react-burger-app-bb.firebaseio.com/movies.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: movie
    }, createMovie.bind(null, movie));
  }

  return (
    <form onSubmit={submitHandler}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;