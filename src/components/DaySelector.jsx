import React from 'react';

function DaySelector({ days, selectedDay, onDaySelect }) {
  return (
    <nav className="flex justify-center py-3.5 bg-neutral-800 shadow-lg">
      {days.map(day => (
        <button
          key={day}
          className={`
            py-2 px-4 mx-1 text-sm sm:text-base rounded-lg font-medium transition-colors duration-150
            ${selectedDay === day 
              ? 'bg-purple-600 text-white' 
              : 'text-neutral-400 hover:bg-purple-500 hover:text-white'
            }
          `}
          onClick={() => onDaySelect(day)}
        >
          {day}
        </button>
      ))}
    </nav>
  );
}

export default DaySelector;