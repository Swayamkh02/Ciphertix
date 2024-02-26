import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import './SignupPage.css';
import { ethers } from 'ethers';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
// import { useContract } from '../pages/ContractContext';
import HomeButton from '../components/HomeButton';


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const [provider1, setProvider] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const initializeContract = async () => {
        try {
            // Set your Ethereum node provider
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            if (!provider) {
              console.error('provider not initialized.');
              return;
            }
            console.log(provider);
            // Set your contract address and ABI
            const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
            // Connect to the contract
            const contract = new ethers.Contract(contractAddress, contract1.abi,provider.getSigner());
            setContract(contract);
            console.log(contract);
            console.log(provider.getSigner().getAddress());
          } catch (error) {
            console.error('Error connecting to the contract:', error.message);
          }
      };

      initializeContract();
  }, []);
  // const contract=useContract;
  console.log(contract);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for null or empty fields
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return; // Prevent further processing
    }
    
    // Check password matching
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Here you can add additional validation if needed
    // (e.g., minimum length, special characters, email format)

    // Handle signup logic here
    // (e.g., send data to your API or backend)
    console.log(contract);
    const registerUser = async () => {
      try {
          const call=await contract.registerUser(username, email).call;
          await call.wait();
          console.log(call);
          console.log('User registered successfully!');
      } catch (error) {
          console.error('Error registering user:', error);
      }
    };

    

    if(contract){
      registerUser(username,email);
      navigate(`/user?username=${username}`);
    }
    else{
      console.log("Contract not present");
    }

    // Assuming successful signup, redirect to a suitable page
    
    // Use the appropriate path as needed
  };

  return (
    <div id="sign-up">
      <div className="ciphertix-logo">
          <img src={require('../images/logo-design-1.png')}/>
      </div>
      <HomeButton/>
          <form onSubmit={handleSubmit} id="form">
      <div id='form-body'>
      <div id="welcome-lines">
            <h2 id="welcome-line-1">Sign Up</h2>
          </div>
        {error && <p className="error">{error}</p>}
        <div id="input-area">
          {/* <label htmlFor="username">Username:</label> */}
          <div className="form-inp">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
            </div>
        {/* </div>
        <div id="input-area"> */}
          {/* <label htmlFor="email">Email:</label> */}
          <div className="form-inp">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
            />
          </div>
        {/* </div>
        <div id="input-area"> */}
          {/* <label htmlFor="password">Password:</label> */}
          <div className="form-inp">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
          </div>
        {/* </div>
        <div id="input-area"> */}
          {/* <label htmlFor="confirmPassword">Confirm Password:</label> */}
          <div className="form-inp">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Passwowrd'
            />
          </div>
        </div>
        <button type="submit" id="submit-button">Signup</button>
        <div className="LoginFromSignup" id="forgot-pass">
          <p>Already a user ? Login<a href='/login'> Here</a></p>
        </div>
      </div>
      
    </form>

    </div>
    

  );
};

export default SignupPage;
