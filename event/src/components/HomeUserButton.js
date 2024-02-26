import React, { useState, useEffect } from 'react';
import './HomeUserButton.css';

const HomeUserButton = ({userName}) =>{
    return(
        <div className="home-user-button">
            <a href={`/user?username=${userName}`} id="home">Home</a>
        </div>
    );
}

export default HomeUserButton;