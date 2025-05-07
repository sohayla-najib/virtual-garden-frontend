import React from "react";
import "./ContactFooter.css";

const ContactFooter = () => {
  return (
    <div className="footer-contact">
      <h2>Feel free to contact us</h2>
      <div className="social-icons">
        <a href="https://instagram.com" target="_blank" aria-label="Instagram" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" aria-label="Twitter" rel="noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactFooter;
