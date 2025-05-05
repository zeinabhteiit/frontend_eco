import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/checkoutpage.css";

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [townCity, setTownCity] = useState("");
  const [departmentFloor, setDepartmentFloor] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + 0; // Add taxes or shipping here if needed

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    try {
      // Step 1: Send shipping address
      const addressPayload = {
        Full_address: fullName,
        Street_address: streetAddress,
        department_floor: departmentFloor,
        town_city: townCity,
      };

      const addressRes = await fetch("http://localhost:5000/api/ordershipmentaddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressPayload),
      });

      const addressResult = await addressRes.json();

      if (!addressRes.ok) throw new Error(addressResult.message || "Failed to save address");

      // Step 2: Send order to backend
      // const orderPayload = {
      //   subtotal_amount: subtotal,
      //   total_amount: total,
      //   order_date: new Date().toISOString().split("T")[0],
      //   status: "Pending",
      //   user_id: 1, // Replace with actual user ID when auth is ready
      // };
      const orderPayload = {
        subtotal_amount: subtotal,
        total_amount: total,
        order_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        user_id: 1,
        products: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      };

      const orderRes = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const orderResult = await orderRes.json();

      if (!orderRes.ok) throw new Error(orderResult.message || "Failed to create order");

      console.log("Order created:", orderResult.data);

      const orderDetails = {
        id: orderResult.data.id,
        total: total.toFixed(2),
        items: cart.length,
        products: [...cart],
        email,
        phone,
        order_date: orderPayload.order_date,
      };

      clearCart();
      navigate("/order-confirmation", { state: orderDetails });
      setIsProcessing(false);
    } catch (error) {
      console.error("Order error:", error.message);
      setIsProcessing(false);
    }
  };

  
 
  return (
    <>
      <Header />
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-breadcrumb">
            <span>HOME</span> / <span>CHECKOUT</span>
          </div>

          <div className="checkout-content">
            <div className="billing-section">
              <h2 className="section-title">Billing details</h2>
              <form className="billing-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Full Name*</label>
                  <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Street address*</label>
                  <input
                    type="text"
                    required
                    placeholder="House number and street name"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Department / Floor</label>
                  <input
                    type="text"
                    placeholder="(Optional)"
                    value={departmentFloor}
                    onChange={(e) => setDepartmentFloor(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Town / City*</label>
                  <input type="text" required value={townCity} onChange={(e) => setTownCity(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone*</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email address*</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </form>
            </div>

            <div className="order-summary">
              <h2 className="section-title">Your order</h2>
              <div className="order-table">
                <div className="order-row header">
                  <div>Product</div>
                  <div>Total</div>
                </div>
                {cart.map((item) => (
                  <div className="order-row" key={item.id}>
                    <div>{item.name} × {item.quantity}</div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <div className="order-row">
                  <div>Subtotal</div>
                  <div>${subtotal.toFixed(2)}</div>
                </div>
                <div className="order-row total">
                  <div>Total</div>
                  <div>${total.toFixed(2)}</div>
                </div>
              </div>

              <button
                className={`place-order-btn ${isProcessing ? "processing" : ""}`}
                onClick={handlePlaceOrder}
                disabled={isProcessing || cart.length === 0}
              >
                {isProcessing ? "Processing..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
