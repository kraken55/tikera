import React from 'react';

function getImageUrl(imageName) {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
}

function formatRuntime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function MovieCard({ movie, onMovieSelect }) {
  return (
    <div 
      className="bg-neutral-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ease-in-out flex flex-col hover:-translate-y-1.5 hover:shadow-xl"
      onClick={() => onMovieSelect(movie)}
    >
      <img 
        src={getImageUrl(movie.image)} 
        alt={movie.title} 
        className="w-full h-auto max-h-[300px] object-cover"
      />
      <div className="p-4 flex-grow">
        <h3 className="text-md sm:text-lg font-semibold mb-1.5 text-neutral-100 truncate" title={movie.title}>{movie.title}</h3>
        <p className="text-xs sm:text-sm text-neutral-400 mb-1">{movie.genre}</p>
        <p className="text-xs sm:text-sm text-neutral-400">{formatRuntime(movie.duration)}</p>
      </div>
    </div>
  );
}

export default MovieCard;