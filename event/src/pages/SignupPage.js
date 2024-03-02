import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection
import './SignupPage.css';
import { ethers } from 'ethers';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';
// import { useContract } from '../pages/ContractContext';
import HomeButton from '../components/HomeButton';
import FileUploadToPinata from '../components/FileUploadToPinata';


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [contract, setContract] = useState(null);
  const [provider1, setProvider] = useState(null);
  const [IdUrl, setUploadedFileUrl] = useState(null);
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
  }, []);
  const handleFileUpload = (url) => {
    setUploadedFileUrl(url); 
  };
  console.log(contract);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword ) {
      setError('Please fill in all fields.');
      return; // Prevent further processing
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log(contract);
    const registerUser = async () => {
      try {
          if(IdUrl){
            const call=await contract.registerUser(username, password, IdUrl).call;
            await call.wait();
            console.log(call);
            console.log('User registered successfully!');
          }else{
            alert("Please upload your Id");
          }
          
      } catch (error) {
          console.error('Error registering user:', error);
      }
    };
    if(contract){
      registerUser(username,email);
      // navigate(`/user?username=${username}`);
      navigate(`/`);
    }
    else{
      console.log("Contract not present");
    }
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
          <div className="form-inp">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
            </div>
          <div className="form-inp">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email'
            />
          </div>
          <div className="form-inp">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password'
            />
          </div>
          <div className="form-inp">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Password'
            />
          </div>
        </div>
        <button type="submit" id="submit-button">Signup</button>
        <div className="LoginFromSignup" id="forgot-pass">
          {IdUrl && <p>You Id Uploaded. 
            <a href={`https://gateway.pinata.cloud/ipfs/${IdUrl}`} target="_blank">See Here</a>
            </p>}
          {!IdUrl && <p>Upload your id to Verify</p>}
          <p>Already a user ? Login<a href='/login'> Here</a></p>
        </div>
        {/* <h1>{IdUrl}</h1> */}
      </div>
      
    </form>
    <div className="upload">
      <FileUploadToPinata onUpload={handleFileUpload}/>
    </div>
        
    </div>
    

  );
};

export default SignupPage;
