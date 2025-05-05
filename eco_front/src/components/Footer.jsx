import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>QUICK LINK</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/checkout">Checkout</a></li>
            {/* <li><a href="/account">Account</a></li> */}
          </ul>
        </div>

        <div className="footer-section">
          <h3>SUPPORT</h3>
          <ul>
            <li>athleticsports@gmail.com</li>
            <li>+961-02888999</li>
          </ul>
        </div>

        {/* <div className="footer-section">
          <h3>GET IN THE KNOW</h3>
          <div className="newsletter">
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
          </div>
        </div> */}
      </div>

      <div className="footer-bottom">
        <p>© Copyright 2025. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;