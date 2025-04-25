import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/cartpage.css";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <Header />
            <div className="container">
                <div className="cart-breadcrumb">
                    <span>HOME</span> / CART
                </div>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                        <button 
                            className="return-btn"
                            onClick={() => navigate("/")}
                        >
                            Return To Shop
                        </button>
                    </div>
                ) : (
                    <div className="clearfix">
                        <div className="cart-items-container">
                            <div className="cart-header">
                                <div>Product</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Total</div>
                            </div>

                            {cart.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <div className="product-display">
                                        <button 
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            X
                                        </button>
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.name} 
                                            className="cart-product-image"  
                                        />
                                        <div>{item.name}</div>
                                    </div>
                                    <div>${item.price.toFixed(2)}</div>
                                    <div>
                                        <input
                                            type="number"
                                            className="quantity-input"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => {
                                                const newQuantity = parseInt(e.target.value) || 1;
                                                updateQuantity(item.id, newQuantity);
                                            }}
                                        />
                                    </div>
                                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}

                            <div className="cart-actions">
                                <button 
                                    className="return-btn"
                                    onClick={() => navigate("/")}
                                >
                                    Return To Shop
                                </button>
                            </div>
                        </div>

                        <div className="cart-totals">
                            <h3>Cart Totals</h3>
                            <div className="totals-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="totals-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="totals-row total-row">
                                <span>Total</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <button 
                                className="checkout-btn"
                                onClick={() => navigate("/checkout")}
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CartPage;