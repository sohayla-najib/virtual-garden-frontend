import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminOrdersPage.css";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://virtual-garden-backend.vercel.app/api/allorders");
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-orders-content">
        <h1>All Orders</h1>
        {error && <p className="error-msg">{error}</p>}
        <div className="order-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h4>Order #{order.id}</h4>
              <p><strong>Customer:</strong> {order.customerId}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Address:</strong> {order.deliveryAddress}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
