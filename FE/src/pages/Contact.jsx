import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import './Contact.css'
function Contact() {
  return (
    <div>
      <NavBar />
      <div className="contactBody">
        <h1>What You Waiting For ?</h1>
        <br />
        <h4>Give us a call or text us or maybe both ?</h4>
        <br />
        <br />
        <br />
        <br />
        <div style={{ display: "flex", columnGap: '100px' }}>
          <div className="contactButton">Contact Us</div>
          <div className="contactButton">Login / Sign Up</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
