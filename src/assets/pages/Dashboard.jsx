// Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
// import './Dashboard.css';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <div className="stats">
          <div className="stat-box">
            <h3>Total Users</h3>
            <p>120</p>
          </div>
          <div className="stat-box">
            <h3>Orders</h3>
            <p>45</p>
          </div>
          <div className="stat-box">
            <h3>Revenue</h3>
            <p>$1,250</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;