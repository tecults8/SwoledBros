import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./Contact.css";

function Contact() {
  return (
    <div>
      <NavBar />
      <div className="contactBody">
        <h1>What Are You Waiting For?</h1>
        <h4>Give us a call, text us, or maybe both?</h4>

        <div className="contactButtons">
          <a
            href="https://wa.me/918438652771?text=Hi!%20I%20am%20interested%20in%20your%20gym%20plan."
            target="_blank"
            rel="noopener noreferrer"
            className="contactButton"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
