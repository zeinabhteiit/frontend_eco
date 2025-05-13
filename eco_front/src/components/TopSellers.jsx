// components/TopSellers.jsx
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/apiServicee";
import ProductCard from "./productcard";
import { useNavigate } from "react-router-dom";
import "../styles/topsellers.css";
import BlackButton from "./BlackButton";
import Modal from "./Modal"; // ✅ Import your modal

const TopSellers = () => {
  const [topProducts, setTopProducts] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
const [addedProduct, setAddedProduct] = useState(null);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        const products = await getAllProducts();
        const cleaned = products.map(p => ({
          ...p,
          name: p.name.replace(/^"(.*)"$/, "$1"),
        }));
        setTopProducts(cleaned.slice(0, 4));
      } catch (err) {
        console.error("Error fetching top sellers:", err);
      }
    };

    fetchTopSellers();
  }, []);

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section className="top-sellers-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Top Sellers</h2>
        <p className="text-gray-600">Best-selling athletic wear this season!</p>
      </div>

      <div className="products-grid">
        {/* {topProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        {topProducts.map(product => (
  <ProductCard 
    key={product.id} 
    product={product} 
    onAddToCart={() => {
      setAddedProduct(product);
      setShowModal(true);
    }} 
  />
))}
      </div>

      <div className="text-center mt-8">
        {/* <button className="btn-shop-now" onClick={handleShopNow}>
          Shop Now
        </button> */}
      <BlackButton text="Shop Now" onClick={() => navigate("/products")} />
      </div>

      
      {/* ✅ Modal */}
      {showModal && (
        <Modal
          product={addedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
      
    </section>
  );
};

export default TopSellers;
