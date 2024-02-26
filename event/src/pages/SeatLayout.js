
import "./SeatLayout.css";
import React, { useState , useEffect} from 'react';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
import { ethers } from 'ethers';
import { useSearchParams } from 'react-router-dom';
import HomeUserButton from '../components/HomeUserButton';
import MovieInfo from "../trial/MovieInfo";

const SeatLayout = () => {
    // Define the number of rows and columns for seats
    const numRows =8;
    const numColumns = 10;

    // State to store selected seats
    const [userName, setUserName] = useState('');
    const [eventName, setEventName] = useState('');
    const [numOfPersons, setNumOfPersons] = useState(1);
    const [searchParams] = useSearchParams();
    const [contract, setContract] = useState(null);
    const [provider1, setProvider] = useState(null);
    const [price, setPrice] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    useEffect(() => {
        const initializeContract = async () => {
          try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              setProvider(provider);
              if (!provider) {
                console.error('provider not initialized.');
                return;
              }
              console.log(provider);
              const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
              const contract = new ethers.Contract(contractAddress, contract1.abi,provider.getSigner());
              setContract(contract);
              console.log(contract);
              console.log(provider.getSigner().getAddress());
            } catch (error) {
              console.error('Error connecting to the contract:', error.message);
            }

        };
       initializeContract();
      console.log(contract);
      const urlUsername = searchParams.get('username');
      const urlEvent=searchParams.get('event');
      setPrice(2);
      setUserName(urlUsername);
      setEventName(urlEvent);
    //   setPrice(0);
      }, [searchParams]);

      const purchaseTicket = async () => {
        try {
        const val=(0.0001+price*selectedSeats.length);
        console.log(val);

        const amount = { value: ethers.utils.parseEther(val.toString()) };
        const tx = await contract.purchaseTicket(userName, eventName,price, selectedSeats.length,selectedSeats,amount);
        // Wait for the transaction to be mined
        await tx.wait();
        // Handle success or show a success message to the user
        console.log('Ticket purchased successfully!');
        } catch (error) {
        console.error('Error purchasing ticket:', error.message);
        }
    };
    // Function to handle seat selection
    const handleSeatSelection = (row, column) => {
        // Check if the seat is already selected
        const seatIndex = selectedSeats.findIndex(seat => seat === `${row}${column}`);
    
        // If the seat is already selected, deselect it
        if (seatIndex !== -1) {
            setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex));
        } else {
            // If the seat is not selected, add it to the selected seats list
            setSelectedSeats([...selectedSeats, `${row}${column}`]);
        }
    };

    // Function to handle booking the selected seats
    const handleBooking = () => {
        // Perform booking logic with selectedSeats array
        console.log("Selected Seats:", selectedSeats);
    };

    return (
        
        <div className="main seat-layout container">
            <div className="ciphertix-logo">
                <img src={require('../images/logo-design-1.png')}/>
            </div>
            <HomeUserButton userName={userName}/>
            {/* Your seat layout JSX */}
           
            <div id="screen" className="movie-screen"> <h4>{eventName}</h4> </div>
            <div className="seats">
                {/* Loop through seat rows */}
                {[...Array(numRows)].map((_, rowIndex) => (
                    <div key={`row-${rowIndex}`} className={`seat-row seat-row-${rowIndex + 1}`}>
                        {/* Loop through seat columns */}
                        {[...Array(numColumns)].map((_, columnIndex) => (
                            <div
                                key={`seat-${rowIndex}-${columnIndex}`}
                                className={`seat ${
                                    selectedSeats.includes(`${rowIndex}${columnIndex}`) ? 'selected-seat' : ''
                                }`}
                                id={`seat-${rowIndex}-${columnIndex}`}
                                onClick={() => handleSeatSelection(rowIndex, columnIndex)}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            <div id="submit-button" className="price-submit">
                <div id="price-calculator">
                    <p>Selected {selectedSeats.length} seats of price {price} , Total Price = {selectedSeats.length*price} Ethers</p>
                </div>
                <button onClick={purchaseTicket}>Book Selected Seats</button>
            </div>
            <div className="content">
            <MovieInfo movie={eventName}/>
            </div>
            

            
        </div>
    );
};

export default SeatLayout;
