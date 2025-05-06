import React from 'react';

function SeatSelection({ room, bookedSeats, selectedSeats, onSeatSelect, maxSeats }) {
  const { rows, seatsPerRow } = room;

  const renderSeats = () => {
    let seatGrid = [];
    for (let i = 1; i <= rows; i++) {
      let rowSeats = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const isBooked = bookedSeats.some(b => b.row === i && b.seat === j);
        const isSelected = selectedSeats.some(s => s.row === i && s.seat === j);
        const isSelectionDisabled = !isSelected && selectedSeats.length >= maxSeats;
        const isDisabled = isBooked || isSelectionDisabled;

        let seatClasses = "w-7 h-7 sm:w-8 sm:h-8 border text-xs sm:text-sm rounded flex justify-center items-center transition-colors duration-150";
        if (isBooked) {
          seatClasses += " bg-neutral-600 text-neutral-400 border-neutral-600 cursor-not-allowed";
        } else if (isSelected) {
          seatClasses += " bg-purple-600 text-white border-purple-600";
        } else if (isSelectionDisabled) {
          seatClasses += " bg-neutral-700 border-neutral-600 text-neutral-500 cursor-not-allowed";
        } else { // Available
          seatClasses += " bg-neutral-900 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white hover:border-purple-500";
        }
        
        rowSeats.push(
          <button
            key={`${i}-${j}`}
            className={seatClasses}
            onClick={() => onSeatSelect({ row: i, seat: j })}
            disabled={isDisabled}
          >
            {j}
          </button>
        );
      }
      seatGrid.push(<div key={i} className="flex gap-1 sm:gap-1.5 justify-center">{rowSeats}</div>);
    }
    return seatGrid;
  };

  return (
    <div className="flex flex-col items-center p-2 bg-neutral-900 rounded-md">
      <div className="w-full max-w-xs sm:max-w-sm py-1.5 mb-3 text-center bg-neutral-700 text-neutral-200 rounded-sm font-semibold tracking-wider text-xs sm:text-sm">SCREEN</div>
      <div className="flex flex-col gap-1 sm:gap-1.5 mb-3">
        {renderSeats()}
      </div>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-neutral-400 items-center">
        <div><span className="inline-block w-3 h-3 rounded-sm mr-1 align-middle bg-neutral-900 border border-purple-500"></span> Available</div>
        <div><span className="inline-block w-3 h-3 rounded-sm mr-1 align-middle bg-purple-600"></span> Selected</div>
        <div><span className="inline-block w-3 h-3 rounded-sm mr-1 align-middle bg-neutral-600 border-neutral-600"></span> Booked</div>
      </div>
    </div>
  );
}

export default SeatSelection;