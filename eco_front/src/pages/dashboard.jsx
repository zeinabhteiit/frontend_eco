import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');

        const ordersResponse = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const usersResponse = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const productsResponse = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });

       setOrders(ordersResponse.data?.orders || []);
setTotalOrders(ordersResponse.data?.orders?.length || 0);
        setTotalUsers(usersResponse.data?.totalUsers || 0);
        setTotalProducts(productsResponse.data?.totalProducts || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.response?.data || error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <h2>Dashboard</h2>

        <div className="stats-cards">
          <div className="card"><h3>Total Orders</h3><p>{totalOrders}</p></div>
          <div className="card"><h3>Total Products</h3><p>{totalProducts}</p></div>
          <div className="card"><h3>Total Users</h3><p>{totalUsers}</p></div>
        </div>

        <div className="orders-section">
          <h3>Recent Orders</h3>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
