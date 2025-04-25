import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/contactform";
import "../styles/contactpage.css"; // Ensure this path is correct

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Header />
      
      <div className="contact-content">
        {/* <div className="search-bar">
          <input type="text" placeholder="What are you looking for?" />
        </div> */}
        
        <div className="contact-main">
          <ContactForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactPage;