import React, { useState } from 'react';
import axios from 'axios';
import './FileUploadToPinata.css';
// require('dotenv').config();


function FileUploadToPinata({ onUpload }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [url, setUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `e0b1f2da608f96419498`,
            pinata_secret_api_key: `62dc06dd5509e6b31cb8097b581d4f496798337ac3c14d9849afee6f944c729b`,
            "Content-Type": "multipart/form-data",
          },
        });
        const url = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        onUpload(resFile.data.IpfsHash); 
        setUrl(url);
        alert("File uploaded successfully");
        setFileName("No file selected");
        setFile(null);
      } catch (error) {
        console.error("Unable to upload file to Pinata:", error);
        alert("Unable to upload file to Pinata");
      }
    } else {
      alert("No file selected");
    }
  };
  const changeButton =()=>{
    const elements = document.getElementsByClassName("upload-file");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add("upload-file-on");
    }
  }
  const retrieveFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
    changeButton();
    
  };

  return (
    <div className="file-upload-to-container">
      {/* <h2>File Upload to Pinata</h2> */}
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-div">
            <input
            type="file"
            id="file-upload"
            name="data"
            onChange={retrieveFile}
            className='input'
            />
             <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" strokeLinejoin="round" strokeLinecap="round" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="icon">
                <polyline points="16 16 12 12 8 16" />
                <line y2="21" x2="12" y1="12" x1="12" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                <polyline points="16 16 12 12 8 16" />
            </svg>
        </div>
        
        {/* <label htmlFor="file-upload">{fileName}</label> */}
        <button className="upload-file" type="submit">Upload Id</button>
      </form>
      
    </div>
  );
}

export default FileUploadToPinata;
