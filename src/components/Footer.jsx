import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="footer-link animated-link">
                  Home
                </a>
              </li>
              <li>
                <Link to="/ourstory" className="footer-link animated-link">
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex justify-content-around">
              <a href="#" className="text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          {/* Contact Section */}
          <div className="col-md-4">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: info@jackedstore.com</p>
            <p>Phone: +1 (123) 456-5555</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
