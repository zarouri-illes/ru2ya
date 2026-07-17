import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Design Graphique', href: '#graphic-design' },
    { name: 'À Propos', href: '#about' },
    { name: 'Nos Réalisations', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#home" className="nav-logo">
            <img src={logo} alt="ru2ya Logo" />
          </a>
          
          <ul className="nav-links desktop-only">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link label">{link.name}</a>
              </li>
            ))}
          </ul>
          
          <div className="nav-cta desktop-only">
            <Button>Démarrer un Projet</Button>
          </div>

          <button 
            className="mobile-menu-btn mobile-only" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} color="var(--color-navy)" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <button 
              className="close-drawer-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} color="var(--color-navy)" />
            </button>
            <div className="mobile-drawer-content">
              <ul className="mobile-nav-links">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="mobile-nav-link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '#contact';
                }}
              >
                Démarrer un Projet
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
