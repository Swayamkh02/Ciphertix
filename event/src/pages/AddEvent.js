import React, { useState, useEffect } from 'react';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
import { ethers } from 'ethers';
import './AddEvent.css'
import '../components/HomeButton'
import HomeButton from '../components/HomeButton';

const AddEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

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
  }, []);

  const addEvent = async () => {
    try {
        const [year, month, day] = eventDate.split("-");
        const [hour, minute, second] = eventTime.split(":");

        const yearInt = parseInt(year);
        const monthInt = parseInt(month);
        const dayInt = parseInt(day);
        const hourInt = parseInt(hour);
        const minuteInt = parseInt(minute);
        const secondInt = parseInt(second);

      const tx=await contract.addEvent(eventName, dayInt, hourInt);
      await tx.wait();
      console.log('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error.message);
    }
  };

  return (
    <div id="add-event">
      <div className="ciphertix-logo">
        <img src={require('../images/logo-design-1.png')}/>
      </div>
      <HomeButton/>
      <div id="form">
        <div id="form-body">
          <div id="welcome-lines">
              <h2 id="welcome-line-1">Add Event</h2>
          </div>
          <div id="input-area">
            <div className="form-inp">
              <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder='Event Name'/>
            </div>
            <div className="form-inp">
              <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} placeholder='Event Date'/>
            </div>
            <div className="form-inp">
              <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} placeholder='Event Time'/>
            </div>
          </div>
          <button onClick={addEvent} id="submit-button">Add Event</button>
          <div className="LoginFromSignup" id="forgot-pass">
            <p>Added Event ? Let's go to <a href='/'> Home</a></p>
          </div>
        </div>
      
      </div>
      
    </div>
  );
};

export default AddEvent;
