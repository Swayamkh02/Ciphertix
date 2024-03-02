import React, { useState, useEffect } from 'react';
import './HomeButton.css';

const HomeButton = () =>{
    return(
        <div className="home-button">
            <a href="/" id="home">Home</a>
        </div>
    );
}
export default HomeButton;