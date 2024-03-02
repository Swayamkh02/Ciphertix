// ContractContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contract1 from '../blockchain/artifacts/contracts/EventTicketing.sol/EventTicketing.json';


const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [provider1, setProvider] = useState(null);

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
    }, []);

    return (
        <ContractContext.Provider value={contract}>
            {children}
        </ContractContext.Provider>
    );
};
export const useContract = () => useContext(ContractContext);
