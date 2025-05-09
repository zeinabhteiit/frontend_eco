// src/pages/OrdersPage.jsx
import React from 'react';
import Sidebar from '../components/sidebar';
import OrderTable from '../components/OrderTable';
//import '../styles/dashboard.css'; // if you're using the same layout styling
import '../styles/orderpage.css'; // Importing new styles
const OrdersPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="dashboard-body">
          <h3>Orders</h3>
          <OrderTable />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
