import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/modal.css";

const Modal = ({ product, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span>✔ Item added to your cart</span>
          <button className="close-icon" onClick={onClose}>×</button>
        </div>

        <div className="modal-product">
          <img src={product.imageUrl} alt={product.name} className="modal-product-img" />
          <p className="modal-product-name">{product.name}</p>
        </div>

        <div className="modal-actions">
          <button onClick={() => navigate("/cart")} className="btn-outline">View my cart</button>
          <button onClick={() => navigate("/checkout")} className="btn-solid">Check out</button>
          <button onClick={onClose} className="btn-link">Continue shopping</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
