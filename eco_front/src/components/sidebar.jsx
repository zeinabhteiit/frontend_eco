import React from 'react';
import { Home, BarChart2, Users, Settings, Package, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth token (if you're using it)
    localStorage.removeItem("token");
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/" className="sidebar-link">
            <Home size={18} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/products" className="sidebar-link">
            <Package size={18} />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/checkout" className="sidebar-link">
            <BarChart2 size={18} />
            <span>Checkout</span>
          </Link>
        </li>
        <li>
          <Link to="/about" className="sidebar-link">
            <Users size={18} />
            <span>About Us</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="sidebar-link">
            <Settings size={18} />
            <span>Contact Us</span>
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="sidebar-link logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
