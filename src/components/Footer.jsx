import React from 'react';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            <img src={logo} alt="ru2ya Logo" />
          </a>
          <p className="footer-tagline">Solutions Web et Logicielles</p>
        </div>
        
        <div className="footer-links-group">
          <ul className="footer-links">
            <li><a href="#home">Accueil</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">À Propos</a></li>
            <li><a href="#portfolio">Nos Réalisations</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container footer-bottom">
        <p className="copyright">
          &copy; {currentYear} ru2ya. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
