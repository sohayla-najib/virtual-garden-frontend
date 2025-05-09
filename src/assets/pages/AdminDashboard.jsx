import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const role = Cookies.get("role");

  const [metrics, setMetrics] = useState({
    userCount: 0,
    blogCount: 0,
    orderCount: 0,
  });

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    } else {
      fetchDashboardMetrics();
    }
  }, [role, navigate]);

  const fetchDashboardMetrics = async () => {
    const token = Cookies.get("token");
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics(res.data);
    } catch (err) {
      console.error("Failed to fetch dashboard metrics", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-cards">
          <div className="cards">
            <h3>Total Orders</h3>
            <p>{metrics.orderCount}</p>
          </div>
          <div className="cards">
            <h3>New Users</h3>
            <p>{metrics.userCount}</p>
          </div>
          <div className="cards">
            <h3>Blogs Posted</h3>
            <p>{metrics.blogCount}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
