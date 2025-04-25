import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate(); // initialized
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
    console.log('Submitting form with data:', formData); // Add this to debug
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
      console.log('Response from API:', result); // Add this to debug
  
      if (response.ok) {
        setMessage('Account created successfully!');
        setFormData({ name: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/');
        }, 1000); // redirect after successful signup

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
      <Header />
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
      <Footer />
    </>
  );
};

export default SignupPage;
