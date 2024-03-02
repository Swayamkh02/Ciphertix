import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ethers } from 'ethers';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
import './MyBookings.css';
import TicketList from '../components/TicketsList';
import { useNavigate } from 'react-router-dom'; // For redirection



const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [username, setUsername] = useState(null);
  const [searchParams] = useSearchParams();
  const [contract, setContract] = useState(null);
  const [provider1, setProvider] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const initializeContract = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        if (!provider) {
          console.error('Provider not initialized.');
          return;
        }
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const contract = new ethers.Contract(contractAddress, contract1.abi, provider.getSigner());
        setContract(contract);
      } catch (error) {
        console.error('Error connecting to the contract:', error.message);
      }
    };
    initializeContract();
    const urlname=searchParams.get('username');
    setUsername(urlname);

    
  }, [searchParams]); 
  const tick=[{
    eventName:"dholakpur",
    numOfPersons:5,
    price:300
  },{
    eventName:"bijapur",
    numOfPersons:31,
    price:1550
  }];
  const getUserBookings = async () => {
    try {
      const userBookings = await contract.getTicketsPurchasedByUser(username);
      await userBookings;
      console.log('User Bookings:', userBookings.toString());
      setUserBookings(userBookings);
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };
  console.log(contract);
  
  if(userBookings){
    console.log(userBookings);
  }else{
    console.log("User details awaited");
  }
  // Function to fetch bookings from the blockchain
  const fetchBookingsFromBlockchain = async () => {
    try {
      if (contract) {
        await getUserBookings();

      } else {
        console.log('Contract absent!');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };
  const goBackToUser =()=>{
    navigate(`/user?username=${username}`);
  };

  
  

  return (
    <div className="my-bookings">
      <div className="head">
        <h2>{username}'s  Bookings</h2> 
        <div className="buttons-head">
          <button onClick={fetchBookingsFromBlockchain} id="bookings-button">See Bookings</button>
          <button onClick={goBackToUser} id="bookings-button">Go Back</button>
        </div>
        
      </div>
      
      {/* <div > */}
        {/* {bookings.map((booking, index) => (
          <div key={index} className="booking-item">
            <p>Movie: {booking.movie}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Seats Booked: {booking.seats}</p>
          </div>
        ))} */}
        <TicketList tickets={userBookings} userName={username} />    
      {/* </div> */}
    </div>
  );
};

export default MyBookings;





    
    
