import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { GiPlantSeed, GiFarmTractor, GiLightBulb } from "react-icons/gi";
import "./Community.css";
import { useNavigate } from "react-router-dom";
import ContactFooter from "../components/ContactFooter";
import Loader from "../components/Loader";  // import loader

const Community = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);  // loading state

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);  // done loading when data fetched
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);  // hide loader even if error
      });
  }, []);

  return (
    <div className="community-page">
      <Navbar />
      <div className="community-content">
        <h2>Our Garden Journal</h2>
        <p>
          Read our latest gardening tips, community stories, and project updates.
        </p>

        {loading ? (
          <Loader />  // show loader while loading
        ) : (
          <div className="community-grid">
            <div className="blog-list">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={blog.imageUrl ? blog.imageUrl : "/fallback.png"}
                    alt={blog.title}
                    className="blog-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.png";
                    }}
                  />
                  {/* <h3>{blog.title}</h3> */}
                  <span className="author">
                    by {blog.author?.username || "Anonymous"}
                  </span>
                </div>
              ))}
            </div>

            <div className="consultation">
              <div className="features">
                <div className="feature-card">
                  <GiPlantSeed size={40} color="#14532d" />
                  <h3>Quality Product</h3>
                  <p>
                    Our flowers are always hygienic quality, carefully selected and sourced from reputable suppliers.
                  </p>
                </div>
                <div className="feature-card">
                  <GiFarmTractor size={40} color="#14532d" />
                  <h3>Always Fresh</h3>
                  <p>
                    Our florists use freshly handpicked and farm-sourced flowers for an eco-friendly experience.
                  </p>
                </div>
                <div className="feature-card">
                  <GiLightBulb size={40} color="#14532d" />
                  <h3>Work Smart</h3>
                  <p>
                    We work smart using innovative techniques and technologies to deliver excellent outcomes.
                  </p>
                </div>
              </div>
              <p>
                <strong>
                  Need help growing a healthy garden? Book your expert consultation now!
                </strong>
              </p>
              <p>
                Our experts are available to help you cultivate a thriving garden. Get personalized tips and advice tailored to your garden's needs.
              </p>
              <button className="book-btn" onClick={() => navigate("/account")}>
                Book Now
              </button>{" "}
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ContactFooter />
    </div>
  );
};

export default Community;
