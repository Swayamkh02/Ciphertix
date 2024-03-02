import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <div className="footer-image">
          <img src={require('../images/logo-black.png')} className="ciphertix-image-footer"/>
        </div>
        <p className="footer-links">
          <a href="#" className="link-1">Home</a>
          <a href="#">Blog</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </p>
        <p className="footer-company-name">CYPHERTIX © 2024</p>
      </div>
      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>Avalahalli </span>Bengaluru ,Karnataka</p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p>+91 123456789</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@ciphertix.com">support@ciphertix.com</a></p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About us</span>
          CIPHERTIX, your ultimate destination for seamless movie ticket bookings. At CIPHERTIX, we're committed to bringing you the latest blockbusters and timeless classics, making your movie-going experience unforgettable. With easy-to-use features and a vast selection of movies, we ensure that every visit to the cinema is a memorable one. Join us as we redefine entertainment, one ticket at a time.
        </p>
        {/* <div className="footer-icons">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-linkedin"></i></a>
          <a href="#"><i className="fa fa-github"></i></a>
        </div> */}
      </div>
    </footer>
  );
};
export default Footer;
