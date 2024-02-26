import React from 'react';
import './UserTaskbar.css';

const UserTaskbar = ({ onSeeProfile, onMyBookings, onLogout }) => {
  return (
    <div className="taskbar">
       <div className="logo">
            <h3>BookMEaShow</h3>
        </div> 
      <button onClick={onSeeProfile}>See Profile</button>
      <button onClick={onMyBookings}>My Bookings</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default UserTaskbar;
