import React from "react";
 import Header from "../components/Header";
 import Footer from "../components/Footer";
import "../styles/aboutpage.css";
import image from "../assets/about-hero.jpg";

const About = () => {
    return (
        <div>
            <Header />
            <div className="span-container"><pre><span>Home &nbsp;/</span>&nbsp; About Us</pre></div>
            <div className="about-page">
                <div className="about-header">
                    <h1>Our Story</h1><br />
                    <p>
                    At AthleticSports, we’re passionate about football and committed to delivering high-quality athletic wear,
                     especially jerseys that blend style, comfort, and performance.
                      Whether you're a player or a fan, our goal is to help you represent your team with pride
                       and confidence—on and off the field.
                    </p><br />
                    
                </div>
                <div className="about-image">
                    <img src={image} alt="About Us" />
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default About;