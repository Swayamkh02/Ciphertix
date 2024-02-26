import React, { useState, useEffect } from 'react';
import './MovieSeatBooking.css'

const MovieSeatBooking = ({userName,eventName}) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
    const [selectedMovieName, setSelectedMovieName] = useState();
    const [ticketPrice, setTicketPrice] = useState(0);

    // Seats data
    const seats = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false]
    ];

    // Populate UI with local storage data
    useEffect(() => {
        const storedSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if (storedSelectedSeats) {
            setSelectedSeats(storedSelectedSeats);
        }

        const storedSelectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        if (storedSelectedMovieIndex) {
            setSelectedMovieIndex(parseInt(storedSelectedMovieIndex));
        }
        setSelectedMovieName(eventName)
    }, []);

    // Update selected count and total
    useEffect(() => {
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        const selectedSeatsCount = selectedSeats.length;
        const totalPrice = selectedSeatsCount * ticketPrice;
        document.getElementById('count').textContent = selectedSeatsCount;
        document.getElementById('total').textContent = totalPrice;
        console.log(eventName);
        console.log(userName);
    }, [selectedSeats, ticketPrice]);

    // Handle movie select
    const handleMovieSelect = (e) => {
        setSelectedMovieIndex(e.target.selectedIndex);
        setTicketPrice(parseInt(e.target.value));
        localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
        localStorage.setItem('selectedMoviePrice', parseInt(e.target.value));
    };

    // Handle seat click
    const handleSeatClick = (rowIndex, seatIndex) => {
        if (!seats[rowIndex][seatIndex]) {
            const seatPosition = [rowIndex, seatIndex];
            const isSeatSelected = selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify(seatPosition));

            if (isSeatSelected) {
                const updatedSeats = selectedSeats.filter(seat => JSON.stringify(seat) !== JSON.stringify(seatPosition));
                setSelectedSeats(updatedSeats);
            } else {
                setSelectedSeats([...selectedSeats, seatPosition]);
            }
        }
    };

    // Render seats
    const renderSeats = () => {
        return seats.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
                {row.map((seat, seatIndex) => (
                    <div
                        key={seatIndex}
                        className={`seat ${seat ? 'occupied' : selectedSeats.some(seat => JSON.stringify(seat) === JSON.stringify([rowIndex, seatIndex])) ? 'selected' : ''}`}
                        onClick={() => handleSeatClick(rowIndex, seatIndex)}
                    ></div>
                ))}
            </div>
        ));
    };

    return (
        <div className="container movie-component">
            <div className="movie-container">
                <label>Movie:</label>
                {/* <select id="movie" onChange={handleMovieSelect} value={ticketPrice}>
                    <option value="650">Parasite (₹650)</option>
                    <option value="850">Joker (₹850)</option>
                    <option value="550">Jumanji: Next Level (₹550)</option>
                    <option value="750">Dolittle (₹750)</option>
                </select> */}
                <input id="movie" placeholder={`${selectedMovieName}`} onChange={handleMovieSelect} disbled/>
            </div>

            <div className="movie-screen">
                <img src='screen-thumb.png' alt='screen' />
            </div>

            <div className="row-container">
                {renderSeats()}
            </div>

            <div className="text-wrapper">
                <p className="text">Selected Seats <span id='count'>0</span></p>
                <p className="text">Total Price ₹<span id="total">0</span></p>
            </div>
        </div>
    );
};

export default MovieSeatBooking;
