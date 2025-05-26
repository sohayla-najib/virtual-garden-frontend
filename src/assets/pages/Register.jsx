import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Account.css";
import ContactFooter from "../components/ContactFooter";
import Loader from "../components/Loader"; // <-- loader import

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // <-- loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // show loader on start
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: name,
        email,
        password,
      });
      setLoading(false); // hide loader
      alert("Registration successful! You can now log in.");
      navigate("/account");
    } catch (err) {
      setLoading(false); // hide loader on error too
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="account-page">
      <div className="content-wrapper">
        <div className="login-form-container">
          <form className="auth-form" onSubmit={handleRegister}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}  // disable input while loading
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            {loading && <Loader />}

            <p className="register-text">
              Already have an account?{" "}
              <Link to="/account" className="register-link">
                Log in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
