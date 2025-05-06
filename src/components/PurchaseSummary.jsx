import React from 'react';

function PurchaseSummary({ 
  ticketQuantities, 
  selectedSeats, 
  ticketPrices, 
  movieTitle,
  screeningTime,
  onPurchase 
}) {
  const calculateTotal = () => {
    let total = 0;
    total += (ticketQuantities.normal || 0) * ticketPrices.normal;
    total += (ticketQuantities.student || 0) * ticketPrices.student;
    total += (ticketQuantities.senior || 0) * ticketPrices.senior;
    return total;
  };

  const totalAmount = calculateTotal();

  return (
    <div className="bg-neutral-800 rounded-lg p-5">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-100">Order Summary</h3>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-3/5 text-sm">
          <p className="mb-1"><strong className="font-semibold text-neutral-200">Movie:</strong> <span className="text-neutral-400">{movieTitle}</span></p>
          <p className="mb-2"><strong className="font-semibold text-neutral-200">Time:</strong> <span className="text-neutral-400">{screeningTime}</span></p>
          
          <h4 className="mt-3 mb-1 text-md font-semibold text-neutral-200">Tickets:</h4>
          <ul className="list-none p-0 mb-2.5 text-neutral-300">
            {ticketQuantities.normal > 0 && <li className="mb-0.5">Normal: {ticketQuantities.normal} x {ticketPrices.normal} HUF</li>}
            {ticketQuantities.student > 0 && <li className="mb-0.5">Student: {ticketQuantities.student} x {ticketPrices.student} HUF</li>}
            {ticketQuantities.senior > 0 && <li className="mb-0.5">Senior: {ticketQuantities.senior} x {ticketPrices.senior} HUF</li>}
          </ul>
          
          <h4 className="mt-3 mb-1 text-md font-semibold text-neutral-200">Selected Seats:</h4>
          <p className="text-neutral-300 break-words">
            {selectedSeats.map(s => `R${s.row}S${s.seat}`).join(', ')}
          </p>
        </div>
        <div className="w-full md:w-2/5 flex flex-col justify-between items-stretch md:items-end mt-4 md:mt-0">
          <div className="text-lg font-bold text-neutral-100 mb-4 text-left md:text-right">
            Total: <strong className="text-xl">{totalAmount} HUF</strong>
          </div>
          <button 
            onClick={onPurchase} 
            className="w-full py-2.5 px-4 text-md font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSummary;