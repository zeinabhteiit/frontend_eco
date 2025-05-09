import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';
// Import your images
//import heroImage from '../assets/hero-banner.jpg'; // Your main banner image
import ProductsList from '../components/productList';
import TopSellers from '../components/TopSellers';
import { FaShippingFast, FaExchangeAlt } from 'react-icons/fa'; // Importing icons from react-icons
import BestSellers from '../components/BestSellers'; // New section

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* Hero Banner Section */}
        {/* <section className="hero-banner">
          <img 
            src={heroImage} 
            alt="AthleticSports Best Sellers - Bowman 7" 
            className="hero-image"
          />
        </section> */}
         {/* Best Sellers Section (now at the top instead of hero banner) */}
         <BestSellers />

        {/* Products List Section */}
        <section className="product-section">
          <ProductsList />
        </section>

        {/* Promo Banners Section */}
        {/* <section className="promo-banners">
          <div className="promo-card">
            <h3>FREE SHIPPING</h3>
            <p>Enjoy free shipping on all  orders above $100</p>
          </div>
          
          <div className="promo-card">
            <h3>30 DAYS RETURN</h3>
            <p>Simply return it within 30 days for an exchange.</p>
          </div>
        </section> */}

{/* Promo Banners Section with React Icons */}
<section className="promo-banners">
          <div className="promo-card">
            <div className="promo-icon-container">
              <FaShippingFast className="promo-icon shipping-icon" />
            </div>
            <h3>FREE SHIPPING</h3>
            <p>Enjoy free shipping on all orders above $100</p>
          </div>
          
          <div className="promo-card">
            <div className="promo-icon-container">
              <FaExchangeAlt className="promo-icon return-icon" />
            </div>
            <h3>30 DAYS RETURN</h3>
            <p>Simply return it within 30 days for an exchange.</p>
          </div>
        </section>

       {/* Top Sellers Section */}
        <section className="py-12 bg-gray-50">
         <TopSellers />
         </section>
         </main>
      
      <Footer />
    </div>
  );
};

export default Home;