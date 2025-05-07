import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/");
  };

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <button onClick={() => navigate("/admin/orders")}>View Orders</button>
      <button onClick={() => navigate("/admin/create-blog")}>
        Create Blog
      </button>
      <button onClick={() => navigate("/admin/create-product")}>
        Add Product
      </button>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
