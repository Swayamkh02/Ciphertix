import React, { useState , useEffect} from 'react';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
import { ethers } from 'ethers';
import { useSearchParams } from 'react-router-dom';
import './TicketDeletingPage.css';
import HomeUserButton from '../components/HomeUserButton';
// import MovieSeatBooking from '../components/MovieSeatBooking';

const TicketDeletingPage = () => {
  const [userName, setUserName] = useState('');
  const [eventName, setEventName] = useState('');
  const [numOfPersons, setNumOfPersons] = useState(1);
  const [searchParams] = useSearchParams();
  const [contract, setContract] = useState(null);
  const [provider1, setProvider] = useState(null);
  const [price, setPrice] = useState(0);

  
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
      setUserName(urlUsername);
      setEventName(urlEvent);
      setPrice(0);
      }, [searchParams]);

      const deleteTicket = async () => {
        try {
        const tx = await contract.deleteTicket(userName,eventName);
        await tx.wait();
        console.log('Ticket purchased successfully!');
        } catch (error) {
        console.error('Error purchasing ticket:', error.message);
        }
  };

  return (
    <div id="ticket-book">
      <div className="ciphertix-logo">
          <img src={require('../images/logo-design-1.png')}/>
      </div>
      <HomeUserButton userName={userName}/>
      {/* <MovieSeatBooking userName={userName} eventName={eventName}/> */}
      <div id="form">
      <div id='form-body'>
        <div id="welcome-lines">
          <h2 id="welcome-line-1">Delete<br></br>Ticket</h2>
        </div>
        <div id="input-area">
          <div className="form-inp">
            {/* <label>Username:</label> */}
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} disabled/>
          </div>
          <div className="form-inp">
            {/* <label>Event Name:</label> */}
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} disabled/>
          </div>
          {/* <div className="form-inp" id="qty-label"> */}
            {/* <div id="qty-label"> */}
              {/* <label >Enter Qty:</label> */}
            {/* </div> */}
            {/* <input type="number" value={numOfPersons} onChange={(e) => setNumOfPersons(parseInt(e.target.value))} placeholder='Num:' /> */}
          {/* </div> */}
          <div className="form-inp">
            {/* <label>Price per Ticket:</label> */}
            <input type="number" value={numOfPersons*100} onChange={(e) => setPrice(parseInt(e.target.value))} disabled/>
          </div>
          <div id="submit-button-cvr">
            <button onClick={deleteTicket} id="submit-button">Delete Ticket</button>
          </div>
          
        </div>
        
      </div>
      </div>
    
    </div>
  );
};

export default TicketDeletingPage;

//http://localhost:3000/ticketBooking?username=Swayam&event=Popeyee