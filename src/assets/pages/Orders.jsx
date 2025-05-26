import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader"; // import your loader component
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);  // loader state
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/account");
      return;
    }

    axios
      .get("http://localhost:5000/api/shop/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);  // done loading
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        alert("Could not load your orders.");
        setLoading(false);  // hide loader even on error
      });
  }, [token, navigate]);

  return (
    <div className="orders-page">
      <Navbar />

      <div className="orders-container">
        <h2>My Orders</h2>
        {loading ? (
          <Loader />  // show loader while fetching
        ) : orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Address:</strong> {order.deliveryAddress}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
