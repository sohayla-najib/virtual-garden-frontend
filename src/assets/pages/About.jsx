import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";
import ContactFooter from "../components/ContactFooter";

const About = () => {
  return (
    <div className="about-page">
      <Navbar />

      <div className="about-content">
        <div className="about-top">
          <div className="about-title">
            <h2>
              <span>Cultivating Community,</span><br />
              One Garden At A Time.
            </h2>
          </div>
          <div className="about-paragraph">
            <p>
              Our mission is to create a vibrant, digital space where people can
              connect, collaborate, and nurture a virtual garden together. We
              believe that gardening is not just about plants—it's about
              cultivating community, fostering creativity, and growing in
              harmony with nature.
            </p>
          </div>
        </div>

        <div className="about-cards">
          <div className="card">
            <div className="icon">🌱</div>
            <h3>Community</h3>
            <p>
              We believe that gardening can be a shared, collaborative experience
              that nurtures both plants and friendships.
            </p>
          </div>
          <div className="card card-highlight">
            <div className="icon">
              <img src="/Outdoor_Plant.png" alt="Outdoor Icon" className="icon-img" />
            </div>
            <h3>Growth</h3>
            <p>
              Our platform encourages sustainable practices and helps individuals
              grow their green thumbs, fostering an appreciation for nature.
            </p>
          </div>
          <div className="card">
            <div className="icon">🌻</div>
            <h3>Empowerment</h3>
            <p>
              We aim to empower users with practical gardening tips and
              interactive tools, helping everyone to cultivate a little green in
              their lives.
            </p>
          </div>
        </div>
      </div><br/><br/><br/><br/><br/><br/><br/>
      <ContactFooter/>
    </div>
  );
};

export default About;
