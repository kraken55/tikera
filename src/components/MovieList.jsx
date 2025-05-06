import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onMovieSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />
      ))}
    </div>
  );
}

export default MovieList;