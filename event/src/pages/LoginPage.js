import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import { ethers } from 'ethers';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
import './LoginPage.css';
import HomeButton from '../components/HomeButton';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const [provider1, setProvider] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

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

  const getUserDetails = async () => {
    try {
      const userDetails = await contract.getUserDetails(username);
      await userDetails;
      console.log('User Details:', userDetails.toString());
      setUserDetails( JSON.stringify(userDetails));
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter a username and password.');
      return;
    }
    if (contract) {
      await getUserDetails();
    } else {
      console.log('Contract absent!');
    }
    if(userDetails){
      console.log(userDetails);
      const userDetailsArray = JSON.parse(userDetails);
      const name = userDetailsArray[0];
      const pass = userDetailsArray[1];
      console.log("name:"+name+"Pass:"+pass);
      if (name === username && pass === password) {
        navigate(`/user?username=${username}`);
      } else {
        alert('User details not found.');
      }
    }else{
      console.log("User details awaited");
    }
  };

  return (
    
    <div id="login-form">
      <div className="ciphertix-logo">
        <img src={require('../images/logo-design-1.png')}/>
      </div>
      <HomeButton/>
      <form onSubmit={handleSubmit} id="form">
        <div id='form-body'>
          <div id="welcome-lines">
            <h2 id="welcome-line-1">Login</h2>
          </div>
          
          {error && <p className="error" id="forgot-entry">{error}</p>}
          <div id="input-area">
            <div className="form-inp">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
            </div>
          </div>
          <div>
            <div className="form-inp">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
          </div>
          <div id="submit-button-cvr">
            <button type="submit" id="submit-button">Login</button>
          </div>
          
          <div className="SignupfromLogin" id="forgot-pass">
            <p>New user ? Sign up <a href='/signup'> Here</a></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
