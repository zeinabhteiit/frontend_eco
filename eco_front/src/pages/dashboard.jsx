import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '../styles/dashboard.css';
import { fetchOrders, fetchUsers, fetchProducts } from '../services/dashboardService';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          fetchOrders(),
          fetchUsers(),
          fetchProducts(),
        ]);

        setOrders(ordersRes.data?.orders || []);
        setTotalOrders(ordersRes.data?.orders?.length || 0);
        setTotalUsers(usersRes.data?.totalUsers || 0);
        setTotalProducts(productsRes.data?.totalProducts || 0);
      } catch (error) {
        console.error('Error fetching dashboard data:', error.response?.data || error.message);
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
              {/* {orders.map(order => (
                <tr key={order._id || order.id}>
                  <td>{order._id || order.id}</td>
                  {/* <td>{order.customer || order.user?.name || 'N/A'}</td> */}
                  {/* <td>{order.user_id}</td>  */}
                  {/* <td>{order.amount || order.total || 0}</td> */}
                  {/* <td>{order.total_amount}</td>
                  <td>{order.status || 'Pending'}</td>
                </tr>
              ))} */} 

              {orders.map(order => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order.customer || order.user?.name || 'N/A'}</td>
      <td>{order.total_amount}</td>
      <td>{order.status || 'Pending'}</td>
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
