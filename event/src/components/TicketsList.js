import React, { useEffect, useState } from 'react';
import './TicketsList.css'
import { useNavigate } from 'react-router-dom';


const TicketList = ({ tickets,userName }) => {
  const navigate = useNavigate();
  // const deleteFunction =(eventName)=>{
  //   navigate(`/ticketDeleting?username=${userName}&event=${eventName}`);
  // }
  return (
    <div className="booking-list">
      {tickets.map((ticket, index) => {
        const eventName = ticket[0];
        if(eventName===''){
          return;
        }
        const price = parseInt(ticket[1]._hex, 16);
        const numOfPersons = parseInt(ticket[2]._hex, 16);
        console.log(ticket[1]);
        return (
          <div className="ticket" key={index}>
            <div className="top"></div>
            <div className="bottom">
              <h1>{eventName}</h1>
              <div className="detail">
                <p>No of Persons: {numOfPersons}</p>
                <ul>
                  {ticket[3].map((seatNumber, index) => (
                    <li key={index}>{parseInt(seatNumber, 16)}</li>
                  ))}
                </ul>
              </div>
              <div className="datetime">
                <div className="time">Total Price: {numOfPersons*2}</div>
                <a href={`/ticketDeleting?username=${userName}&event=${eventName}`} className="delete-link">Delete Ticket</a>
              </div>            
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketList;
