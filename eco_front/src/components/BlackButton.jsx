// components/BlackButton.jsx
import React from "react";
import "../styles/blackbutton.css"; // You’ll create this CSS next

const BlackButton = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button className={`black-button ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default BlackButton;
