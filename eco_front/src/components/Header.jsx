import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const handleCartClick = () => navigate("/cart");
  const handleUserClick = () => navigate("/login");

  return (
    <header className="athletic-header">
      <div className="container">
        <nav className="main-nav">
          <h1 className="logo">AthleticSports</h1>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">products</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>

          <div className="user-actions">
            {/* <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="What are you looking for?"
                className="search-input"
              />
            </div>
             */}
            <button onClick={handleCartClick} className="icon-button">
              <FaShoppingCart />
            </button>
            <button onClick={handleUserClick} className="icon-button">
              <FaUser />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;