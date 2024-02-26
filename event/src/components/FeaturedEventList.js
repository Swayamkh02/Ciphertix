import React, { useState, useEffect } from 'react';
import './FeaturedEventList.css'; // Import the CSS file for styling

const FeaturedEventList = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval);
  }, [events.length]);

  return (
    <div className="featured-event-list">
      {/* Render the carousel content here */}
      <div className="carousel">
        {events.map((event, index) => (
          <div key={index} className={index === currentIndex ? 'slide active' : 'slide'}>
            <img src={event.imageURL} alt={event.title} />
            <center>
              <div className="caption">
                <h2>{event.title}</h2>
                <p>{event.description}</p>
              </div>
            </center>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEventList;
