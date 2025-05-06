import React from 'react';

function getImageUrl(imageName) {
    return new URL(`../assets/images/${imageName}`, import.meta.url).href;
}

function formatRuntime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function MovieDetails({ movie, selectedDay, onScreeningSelect, selectedScreeningId }) {
  const screeningsForDay = movie.screenings
    .filter(s => s.weekday === selectedDay)
    .sort((a, b) => a.start_time.localeCompare(b.start_time));

  return (
    <div className="bg-neutral-800 rounded-lg p-5 flex flex-col sm:flex-row gap-5">
      <img 
        src={getImageUrl(movie.image)} 
        alt={movie.title} 
        className="w-full sm:w-48 h-auto max-h-[300px] object-cover rounded-lg self-center sm:self-start"
      />
      <div className="flex-grow">
        <h2 className="text-xl lg:text-2xl font-bold mb-2.5 text-neutral-100">{movie.title}</h2>
        <p className="text-sm text-neutral-300 mb-3 leading-relaxed">{movie.description}</p>
        <p className="mb-1.5 text-sm"><strong className="font-semibold text-neutral-200">Genre:</strong> <span className="text-neutral-400">{movie.genre}</span></p>
        <p className="mb-1.5 text-sm"><strong className="font-semibold text-neutral-200">Runtime:</strong> <span className="text-neutral-400">{formatRuntime(movie.duration)}</span></p>
        
        <h4 className="text-md font-semibold mt-4 mb-2 text-neutral-100">Screenings on {selectedDay}:</h4>
        <div className="flex flex-wrap gap-2">
          {screeningsForDay.map(screening => (
            <button
              key={screening.id}
              onClick={() => onScreeningSelect(screening)}
              className={`
                py-1.5 px-3 text-sm rounded-md cursor-pointer border transition-colors duration-150
                ${selectedScreeningId === screening.id 
                  ? 'bg-neutral-900 text-purple-500 border-purple-500 font-semibold' 
                  : 'bg-purple-600 hover:bg-purple-500 text-white border-transparent'
                }
              `}
            >
              {screening.start_time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;