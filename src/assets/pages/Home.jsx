import React from "react";
import Navbar from "../components/Navbar";
import "./Home.css";
import { Link } from "react-router-dom";
import ContactFooter from "../components/ContactFooter";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section">
        <h1>Grow Together in Our Virtual Community Garden</h1>
        <p>
          Collaborate, nurture, and enjoy a shared digital garden experience.
          Interact and care for your garden together. Watch your plants grow and
          thrive. Order gardening kits and pay on delivery.
        </p>
        <div className="hero-buttons">
          <Link to="/account" className="primary-btn">
            Join the Garden
          </Link>
          <Link to="/shop" className="secondary-btn">
            Get Started
          </Link>
        </div>
      </div>
      <ContactFooter/>
    </div>
  );
};

export default Home;
