// components/GrayButton.jsx
import React from "react";
import "../styles/graybutton.css"; // You’ll create this CSS file next

const GrayButton = ({ text, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      className={`gray-button ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default GrayButton;
