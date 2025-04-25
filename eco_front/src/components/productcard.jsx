import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/productcard.css"; // Make sure this path is correct
import {Link, useNavigate } from "react-router-dom"; // Import useNavigate
 


const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleAddToCartClick = (e) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation(); // Stop event from bubbling up
    addToCart(product); // Add product to cart
    navigate("/cart"); // Navigate to cart page
  };


  return (
    <Link to={`/productdetails/${product.id}`}>

    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="product-image"
        />
        
        {/* <button 
          className="add-to-cart-button"
          // onClick={() => addToCart(product)}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button> */}

        <button className="add-to-cart-button" onClick={handleAddToCartClick} 
      >
        Add to cart
      </button>
      </div>
      
      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>

      {/* <button className="add-to-cart-button" onClick={handleAddToCartClick} 
      >
        Add to cart
      </button> */}

    </div>
   </Link>
  );
};

export default ProductCard;