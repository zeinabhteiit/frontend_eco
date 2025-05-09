import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { LayoutDashboard, ClipboardList, Package, Users, LogOut } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();  // Initialize navigate for redirection

  const handleLogout = () => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2> 
      <ul>
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/orders" className="sidebar-link">
            <ClipboardList size={18} />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/products" className="sidebar-link">
            <Package size={18} />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/users" className="sidebar-link">
            <Users size={18} />
            <span>Users</span>
          </Link>
        </li>
      </ul>

      <div className="logout-section">
        {/* Logout button with handleLogout function */}
        <button className="sidebar-link logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
