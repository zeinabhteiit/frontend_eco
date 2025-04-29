import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CartPage from './pages/cartpage';
// import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/checkoutpage';
import AboutPage from './pages/aboutpage';
import ContactPage from './pages/contactpage';
import ProductPage from './pages/productpage';
import ProductDetails from './pages/productdetails';
import Login from './pages/Login';
import Signup from './pages/signup';
import OrderConfirmation from './pages/orderconfirmation';
// import DashboardHome from "./pages/dashboard/DashboardHome";
import ProtectedRoute from './components/protectedroute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ManageShipments from './pages/dashboard/ManageShipments';

function App() {
  return (
    // <CartProvider>

      <Router>
      
        <div className="App">

          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />     
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetails />} /> 
            <Route path="/productdetails/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            {/* <Route path="/dashboard" element={<DashboardHome />} /> */}
            {/* <Route
              path="/dashboard"
             element={
            <ProtectedRoute>
            <DashboardHome />
               </ProtectedRoute>
              }
            /> */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />

                <Route 
                    path="/dashboard/shipments" 
                   element={
                  <ProtectedRoute>
                  <ManageShipments />
                  </ProtectedRoute>
                     }
                  />
          </Routes>
         
        </div>
       
      </Router>
    // </CartProvider>
  );
}

export default App;