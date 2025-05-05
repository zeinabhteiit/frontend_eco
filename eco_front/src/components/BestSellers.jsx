import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import '../styles/bestSellers.css';
import frontImage from '../assets/front.png';
import backImage from '../assets/back.png';
import BlackButton from './BlackButton'; // ✅ import your button

const BestSellers = () => {
  const navigate = useNavigate(); // ✅ initialize

  const handleShopNow = () => {
    navigate('/products'); // ✅ navigate to products page
  };

  return (
    <section className="best-sellers">
      <div className="seller-img-wrapper">
        <img src={frontImage} alt="Player front view" className="seller-img" />
        <div className="overlay-content">
          <h2>GET OUR<br />BEST SELLERS</h2>

          {/* ✅ use your reusable BlackButton */}
          <BlackButton
            text="SHOP NOW"
            onClick={handleShopNow}
            className="shop-now-btn"
          />
        </div>
      </div>
      <img src={backImage} alt="Player back view" className="seller-img" />
    </section>
  );
};

export default BestSellers;

