import React, { useState, useEffect, useMemo } from 'react';
import moviesDataImport from './assets/movies.json';
import DaySelector from './components/DaySelector';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import TicketReservation from './components/TicketReservation';
import PurchaseSummary from './components/PurchaseSummary';
import './App.css';

const WEEKDAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Higher reset levels cascade down to lower levels
const RESET_LEVEL = {
  DAY: 1,
  MOVIE: 2,
  SCREENING: 3
};

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedScreening, setSelectedScreening] = useState(null);
  const [ticketQuantities, setTicketQuantities] = useState({ normal: 0, student: 0, senior: 0 });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    setMoviesData(moviesDataImport);
    const dayIndex = new Date().getDay();
    setSelectedDay(WEEKDAYS_ORDER[dayIndex === 0 ? 6 : dayIndex - 1]);
  }, []);

  const resetSelections = (level) => {
    if (level <= RESET_LEVEL.DAY) setSelectedMovie(null);
    if (level <= RESET_LEVEL.MOVIE) setSelectedScreening(null);
    if (level <= RESET_LEVEL.SCREENING) {
      setTicketQuantities({ normal: 0, student: 0, senior: 0 });
      setSelectedSeats([]);
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    resetSelections(RESET_LEVEL.DAY);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    resetSelections(RESET_LEVEL.MOVIE);
  };

  const handleScreeningSelect = (screening) => {
    setSelectedScreening(screening);
    resetSelections(RESET_LEVEL.SCREENING);
  };

  const handleTicketQuantityChange = (type, amount) => {
    setTicketQuantities(prev => {
      const newQuantity = Math.max(0, prev[type] + amount);
      const newQuantities = { ...prev, [type]: newQuantity };
      setSelectedSeats([]);
      return newQuantities;
    });
  };

  const handleSeatSelect = (seat) => {
    const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0);
    setSelectedSeats(prev => {
      const isSelected = prev.find(s => s.row === seat.row && s.seat === seat.seat);
      if (isSelected) {
        return prev.filter(s => !(s.row === seat.row && s.seat === seat.seat));
      } else {
        if (prev.length < totalTickets) {
          return [...prev, seat];
        }
        return prev;
      }
    });
  };
  
  const handlePurchase = () => {
    setShowSuccessPopup(true);
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    resetSelections(RESET_LEVEL.SCREENING);
  };

  const moviesOnSelectedDay = useMemo(() => {
    return moviesData.filter(movie =>
      movie.screenings.some(s => s.weekday === selectedDay)
    );
  }, [selectedDay]);

  const totalTickets = Object.values(ticketQuantities).reduce((sum, qty) => sum + qty, 0);
  const showPurchaseSummary = totalTickets > 0 && selectedSeats.length === totalTickets;

  return (
    <div className="flex flex-col min-h-screen"> 
      <DaySelector
        days={WEEKDAYS_ORDER}
        selectedDay={selectedDay}
        onDaySelect={handleDaySelect}
      />
      <div className="flex flex-col md:flex-row flex-grow p-5 gap-5"> 
        <div className="w-full md:w-1/2 overflow-y-auto md:pr-2.5 mb-5 md:mb-0"> 
          <MovieList
            movies={moviesOnSelectedDay}
            onMovieSelect={handleMovieSelect}
          />
        </div>
        <div className="w-full md:w-1/2 overflow-y-auto md:pl-2.5 flex flex-col gap-5">
          {selectedMovie && (
            <MovieDetails
              movie={selectedMovie}
              selectedDay={selectedDay}
              onScreeningSelect={handleScreeningSelect}
              selectedScreeningId={selectedScreening?.id}
            />
          )}
          {selectedMovie && selectedScreening && (
            <TicketReservation
              screening={selectedScreening}
              ticketQuantities={ticketQuantities}
              onTicketQuantityChange={handleTicketQuantityChange}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
              totalTickets={totalTickets}
            />
          )}
          {selectedMovie && selectedScreening && showPurchaseSummary && (
            <PurchaseSummary
              ticketQuantities={ticketQuantities}
              selectedSeats={selectedSeats}
              ticketPrices={{
                normal: 2500,
                student: 2000,
                senior: 1800,
              }}
              movieTitle={selectedMovie.title}
              screeningTime={selectedScreening.start_time}
              onPurchase={handlePurchase}
            />
          )}
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-neutral-800 p-7 rounded-lg text-center shadow-xl max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-3 text-neutral-100">Purchase Successful!</h3>
            <p className="text-neutral-300 mb-6">Your seats have been reserved.</p>
            <button 
              onClick={closePopup}
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
