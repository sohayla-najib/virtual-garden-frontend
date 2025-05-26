import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./Account.css";
import ContactFooter from "../components/ContactFooter";
import Loader from "../components/Loader";  // Adjust path accordingly

const Account = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.user?.role;

      Cookies.set("token", token);
      if (role) {
        Cookies.set("role", role);
      }

      setLoading(false);

      if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      alert("Login failed. Please check your credentials.",err);
    }
  };

  return (
    <div className="account-page">
      <div className="content-wrapper">
        <div className="login-form-container">
          <form className="auth-form" onSubmit={handleLogin}>
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
              placeholder="Add password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            {loading && <Loader />}

            <p className="register-text">
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
