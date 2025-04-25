import React from 'react';
import '../styles/detailsproductpage.css';

const ProductImages = ({ images }) => {
  const imgUrl = images && images.length > 0 ? images[0] : 'default.jpg';
  return (
    <div className="product-image">
      <img src={imgUrl} alt="Product" />
    </div>
  );
};

export default ProductImages;
