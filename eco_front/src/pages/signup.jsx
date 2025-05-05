import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import '../styles/signup.css';

const SignupPage = () => {
  const navigate = useNavigate();

  // Prevent going back from signup page
  useEffect(() => {
    const handlePopState = (e) => {
      navigate(0); // stay on the same page
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'  // Default role
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData);
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      console.log('Response from API:', result);
  
      if (response.ok) {
        setMessage('Account created successfully!');
        setFormData({ name: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/', { replace: true }); // replace history to avoid going back
        }, 1000);
      } else {
        setMessage(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <>
      {/* <Header /> */}
      <div className="login-container">
        <h2>Create an Account</h2>
        <p className="subtitle">Enter your details below</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        {message && <p className="message">{message}</p>}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default SignupPage;
