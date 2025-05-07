import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Checkout.css";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!token) return navigate("/account");
  
    const decoded = jwtDecode(token);
    const customerId = decoded.id;
  
    try {
      const cartRes = await axios.get("http://localhost:5000/api/shop/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const cartItems = cartRes.data;
  
      const orderItems = cartItems.map((item) => ({
        productId: item.Product.id,
        quantity: item.quantity,
      }));
  
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.Product.price,
        0
      );
  
      await axios.post(
        "http://localhost:5000/api/shop/checkout",
        {
          customerId,
          totalAmount,
          paymentMethod: "COD",
          deliveryAddress: address,
          orderItems,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      await Promise.all(
        cartItems.map((item) =>
          axios.delete(`http://localhost:5000/api/shop/cart/${item.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
  
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Error placing order.");
    }
  };
  

  return (
    <div className="checkout-page">
      <Navbar />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
