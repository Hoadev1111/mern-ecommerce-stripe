import React from 'react';
import '../scss/footer.scss';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#!">about us</a>
              </li>
              <li>
                <a href="#!">our services</a>
              </li>
              <li>
                <a href="#!">privacy policy</a>
              </li>
              <li>
                <a href="#!">affiliate program</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get help</h4>
            <ul>
              <li>
                <a href="#!">FAQ</a>
              </li>
              <li>
                <a href="#!">shipping</a>
              </li>
              <li>
                <a href="#!">returns</a>
              </li>
              <li>
                <a href="#!">order status</a>
              </li>
              <li>
                <a href="#!">payment options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Online shop</h4>
            <ul>
              <li>
                <a href="#!">watch</a>
              </li>
              <li>
                <a href="#!">bag</a>
              </li>
              <li>
                <a href="#!">shoes</a>
              </li>
              <li>
                <a href="#!">dress</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow us</h4>
            <div className="social-links">
              <a href="#!">
                <FaFacebook />
              </a>
              <a href="#!">
                <FaInstagram />
              </a>
              <a href="#!">
                <FaTwitter />
              </a>
              <a href="#!">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
