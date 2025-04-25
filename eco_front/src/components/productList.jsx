// components/ProductsList.js
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/apiServicee";
import ProductCard from "./productcard";
import '../styles/productlist.css';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        console.log("API response:", products);
        // Clean product names by removing escaped quotes if present
        const cleanedProducts = products.map(product => ({
          ...product,
          name: product.name.replace(/^"(.*)"$/, '$1')
        }));
        setProducts(cleanedProducts);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="text-center py-20">
      <p className="text-lg font-semibold">Loading products...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 text-lg">{error}</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Discover NEW Arrivals</h1>
        <p className="text-gray-600">Recently added shirts!</p>
      </div>
      
      {/* Use products-grid class from our CSS */}
      <div className="products-grid">
        {/* {products.map((product) => ( */}
        {products.slice(0, 8).map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;