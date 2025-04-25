import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", contactData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/contact/send-email', contactData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        setStatus('Message sent successfully!');
        setContactData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-title">We would love to hear from you.</h2>
      <p className="contact-subtitle">If you have any type of suggestion, you can contact us here. We would love to hear from you.</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Message</label>
          <textarea
            name="message"
            value={contactData.message}
            onChange={handleChange}
            className="form-textarea"
            required
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn">
          SEND MESSAGE
        </button>
      </form>
      
      {status && <p className="status-message">{status}</p>}
      
      <div className="contact-info">
        <h3>Write To US</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Emails: customer@athleticsports.com</p>
        <p>Emails: support@athleticsports.com</p>
      </div>
    </div>
  );
};

export default ContactForm;