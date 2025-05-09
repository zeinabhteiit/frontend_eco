import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import BlackButton from "../components/BlackButton";

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_rwu9qzj',       // Your Service ID
      'template_tzzh58m',      // Your Template ID
      form.current,
      'l_4RBlYHHtAYbSxJM'  // Replace this with your EmailJS public key
    )
    .then(
      (result) => {
        console.log(result.text);
        setStatus('Message sent successfully!');
        form.current.reset(); // Reset form after successful submission
      },
      (error) => {
        console.log(error.text);
        setStatus('Failed to send message.');
      }
    );
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-title">We would love to hear from you.</h2>
      <p className="contact-subtitle">If you have any type of suggestion, you can contact us here. We would love to hear from you.</p>
      
      <form ref={form} onSubmit={handleSubmit} className="contact-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="user_name" className="form-input" required />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="user_email" className="form-input" required />
          </div>
        </div>
        
        <div className="form-group full-width">
          <label>Message</label>
          <textarea name="message" className="form-textarea" required></textarea>
        </div>
        
        <BlackButton type="submit" text="SEND MESSAGE" className="submit-btn" />
      </form>

      {status && <p className="status-message">{status}</p>}

      <div className="contact-info">
        <h3>Write To Us</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Emails: customer@athleticsports.com</p>
        <p>Emails: support@athleticsports.com</p>
      </div>
    </div>
  );
};

export default ContactForm;
