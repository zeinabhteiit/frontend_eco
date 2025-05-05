import React, { useState } from 'react';
import '../styles/detailsproductpage.css';

import BlackButton from "./BlackButton";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-info">
      <h2>{product.name}</h2>
      <p className="product-desc">{product.description}</p>
      <p className="product-price">${product.price}</p>
      <div className="quantity-add">
        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={() => setQuantity(q => q + 1)}>+</button>
        {/* <button className="add-to-cart-btn">Add to cart</button> */}{/* ✅ Use BlackButton */}
        <BlackButton 
          text="Add to cart" 
          onClick={() => {
            // Add your add-to-cart logic here
            console.log(`Added ${quantity} item(s) of ${product.name} to cart`);
          }} 
        />
      </div>
    </div>
  );
};

export default ProductInfo;
