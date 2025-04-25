
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/Home.css';
import { CartProvider } from './context/CartContext'; // <-- Add this line

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);