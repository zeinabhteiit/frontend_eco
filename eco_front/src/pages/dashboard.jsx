import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '../styles/dashboard.css';
import { getAllProducts } from '../services/apiService';
import { fetchUsers } from '../services/userservicee';
import { getShipments } from '../services/shipmentService';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, usersRes, ordersRes] = await Promise.all([
          getAllProducts(),
          fetchUsers(),
          getShipments(),
        ]);

        const productsData = Array.isArray(productsRes) ? productsRes : productsRes?.data || [];
        const usersData = Array.isArray(usersRes) ? usersRes : usersRes?.data || [];
        const ordersData = Array.isArray(ordersRes) ? ordersRes : ordersRes?.data || [];

        console.log("Fetched Orders:", ordersData);

        setProducts(productsData);
        setUsers(usersData);
        setOrders(ordersData);

        setTotalProducts(productsData.length);
        setTotalUsers(usersData.length);
        setTotalOrders(ordersData.length);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
        <th>User ID</th>
        <th>Subtotal</th>
        <th>Total</th>
        <th>Order Date</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => {
        console.log('Order:', order);
        return (
          <tr key={order.id || order._id}>
            <td>{order.id || order._id}</td>
            <td>{order.userId || 'N/A'}</td>
            <td>{order.subtotal || 0}</td>
            <td>{order.total || 0}</td>
            <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>
      </main>
    </div>
  );
};

export default Dashboard;
