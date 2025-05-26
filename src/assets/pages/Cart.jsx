import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";  // import loader
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);  // loader state
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/account");
      return;
    }

    axios
      .get("http://localhost:5000/api/shop/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItems(res.data);
        setLoading(false);  // done loading
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);  // hide loader even on error
      });
  }, [token, navigate]);

  const handleRemove = (itemId) => {
    axios
      .delete(`http://localhost:5000/api/shop/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty < 1) return;
    axios
      .put(
        `http://localhost:5000/api/shop/cart/${itemId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, quantity: newQty } : item
          )
        );
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.Product.price,
    0
  );

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h2>Your Cart</h2>
        {loading ? (
          <Loader />  // show loader while fetching
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-grid">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={
                      item.Product.imageUrl?.startsWith("http")
                        ? item.Product.imageUrl
                        : `http://localhost:5000/uploads/${item.Product.imageUrl}`
                    }
                    alt={item.Product.name}
                  />

                  <div className="cart-info">
                    <h4>{item.Product.name}</h4>
                    <p>Price: ${item.Product.price}</p>
                    <div className="quantity-control">
                      <label>Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value))
                        }
                      />
                    </div>
                    <button onClick={() => handleRemove(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
