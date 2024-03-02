import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserComponent from './pages/UserComponent';
import MyBookings from './pages/MyBookings';
// import { ContractProvider } from './pages/ContractContext';
import AddEvent from './pages/AddEvent';
import SeatLayout from './pages/SeatLayout';
import TicketDeletingPage from './pages/TicketDeletingPage';
import MovieInfo from './trial/MovieInfo';


function App() {
  return (
    <BrowserRouter>
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossorigin="anonymous"
      /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ticketBooking" element={<SeatLayout/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user" element={<UserComponent />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/ticketDeleting" element={<TicketDeletingPage />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/movie-info" element={<MovieInfo />} />
        {/* <Route path="/events/:eventId" element={<EventDetails />} /> */}
      </Routes>
    </BrowserRouter>
  );
}


export default App;
