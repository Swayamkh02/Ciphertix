import React from 'react';
import './UserTaskbar.css';

const UserTaskbar = ({ onSeeProfile, onMyBookings, onLogout }) => {
  return (
    <div className="taskbar">
       <div className="logo">
            <img src={require('../images/logo-design-1.png')}/>
        </div> 
      <button onClick={onSeeProfile}>See Profile</button>
      <button onClick={onMyBookings}>My Bookings</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserTaskbar;
