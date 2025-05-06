import React from 'react';
import SeatSelection from './SeatSelection';

function TicketReservation({
  screening,
  ticketQuantities,
  onTicketQuantityChange,
  selectedSeats,
  onSeatSelect,
  totalTickets
}) {
  const ticketTypes = [
    { id: 'normal', label: 'Normal', price: 2500 },
    { id: 'student', label: 'Student Discount', price: 2000 },
    { id: 'senior', label: 'Senior Discount', price: 1800 },
  ];

  return (
    <div className="bg-neutral-800 rounded-lg p-5">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-100">Reserve Tickets</h3>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-2/5">
          <h4 className="text-md font-medium mb-2.5 text-neutral-200">Select Tickets:</h4>
          {ticketTypes.map(type => (
            <div key={type.id} className="flex justify-between items-center mb-2 p-2.5 bg-neutral-900 rounded-md">
              <span className="text-sm text-neutral-200">{type.label} ({type.price} HUF)</span>
              <div className="flex items-center">
                <button 
                  onClick={() => onTicketQuantityChange(type.id, -1)} 
                  disabled={ticketQuantities[type.id] === 0}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-lg leading-none bg-purple-600 hover:bg-purple-500 text-white rounded-md disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                  - 
                </button>
                <span className="mx-2 sm:mx-2.5 min-w-[20px] text-center text-sm sm:text-base text-neutral-200">{ticketQuantities[type.id]}</span>
                <button 
                  onClick={() => onTicketQuantityChange(type.id, 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-lg leading-none bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors"
                >
                  + 
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full lg:w-3/5">
          {totalTickets > 0 /*&& screening*/ ? (
            <>
              <h4 className="text-md font-medium mb-2.5 text-neutral-200">Select Seats ({selectedSeats.length}/{totalTickets}):</h4>
              <SeatSelection
                room={screening.room}
                bookedSeats={screening.bookings}
                selectedSeats={selectedSeats}
                onSeatSelect={onSeatSelect}
                maxSeats={totalTickets}
              />
            </>
          ) : (
            <div className="h-full flex items-center justify-center mt-5 lg:mt-0 p-5 border-2 border-dashed border-neutral-700 rounded-lg min-h-[150px]">
                 <p className="text-neutral-500 text-center text-sm">
                    Add tickets to select seats.
                 </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketReservation;