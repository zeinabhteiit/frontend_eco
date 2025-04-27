// login.jsx
import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Prevent user from going back to the previous page
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");

        // 👉 Redirect to dashboard page (you can change the path)
        window.location.href = "/dashboard";
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };
  
  return (
    <div className="login-page">
      {/* <Header /> */}
      <main className="login-main">
        {/* <div className="search-prompt">What are you looking for?</div> */}
        
        <div className="login-box">
          <h2>Login</h2>
          <p className="login-instruction">please enter your e-mail and password</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="login-button">Log in</button>
            
            {message && <p className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</p>}
            
            <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
          </form>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
