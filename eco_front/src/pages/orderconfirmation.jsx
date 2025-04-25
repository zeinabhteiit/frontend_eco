import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/confirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="error-page">
        <h2>No order information found.</h2>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  const { id, total, items, products, email, phone, order_date } = state;

  return (
    <>
      <Header />
      <div className="confirmation-page">
        <div className="container">
          <h1>Thank you for your order!</h1>
          <p>Order ID: <strong>{id}</strong></p>
          <p>Date: {order_date}</p>
          <p>Total: <strong>${total}</strong></p>
          <p>Items: {items}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>

          <h3>Order Summary</h3>
          <ul>
            {products.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>

          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
