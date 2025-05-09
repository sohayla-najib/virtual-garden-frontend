import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../components/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/account" ||
    location.pathname === "/register";

  const token = Cookies.get("token");
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (token) {
      axios
        .get("https://virtual-garden-backend.vercel.app/api/shop/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const total = res.data.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(total);
        })
        .catch((err) => {
          console.error("Error fetching cart:", err);
        });
    }
  }, [token]);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/account");
  };

  return (
    <nav className={`navbar ${isHome ? "navbar-home" : "navbar-default"}`}>
      <div className="logo">Virtual Garden</div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li><Link className={location.pathname === "/" ? "active" : ""} to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link className={location.pathname === "/about" ? "active" : ""} to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link className={location.pathname === "/community" ? "active" : ""} to="/community" onClick={() => setMenuOpen(false)}>Community</Link></li>
        <li><Link className={location.pathname === "/shop" ? "active" : ""} to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>

        {token && (
          <>
            <li className="cart-icon" onClick={() => { setMenuOpen(false); navigate("/cart"); }}>
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </li>
            <li>
              <button className="account-btn" onClick={() => { setMenuOpen(false); navigate("/orders"); }}>
                My Orders
              </button>
            </li>
          </>
        )}

        {token ? (
          <button className="account-btn" onClick={() => { handleLogout(); setMenuOpen(false); }}>
            Logout
          </button>
        ) : (
          <Link to="/account" className="account-btn" onClick={() => setMenuOpen(false)}>
            Account
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
