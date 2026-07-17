import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-content">
            <h2 className="label" style={{ color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>Contactez-Nous</h2>
            <h3 className="section-title" style={{ marginBottom: '1.5rem' }}>Prêt à démarrer votre projet ?</h3>
            <p className="contact-description">
              Que vous ayez besoin d'un site web, d'un logiciel sur mesure ou que vous souhaitiez discuter de votre vision, notre équipe est prête à échanger. Contactez-nous.
            </p>
          </div>
          
          <div className="contact-details">
            <div className="contact-item">
              <Mail className="contact-icon" size={24} />
              <div className="contact-info">
                <span className="contact-label label">Écrivez-nous</span>
                <a href="mailto:hello@ru2ya.com" className="contact-value">hello@ru2ya.com</a>
              </div>
            </div>

            <div className="contact-item">
              <Phone className="contact-icon" size={24} />
              <div className="contact-info">
                <span className="contact-label label">Appelez-nous</span>
                <a href="tel:+15551234567" className="contact-value">+1 (555) 123-4567</a>
              </div>
            </div>

            <div className="contact-item">
              <MapPin className="contact-icon" size={24} />
              <div className="contact-info">
                <span className="contact-label label">Adresse</span>
                <span className="contact-value">Dubaï, Émirats Arabes Unis</span>
              </div>
            </div>

            <div className="social-links-container">
              <span className="label social-label">Suivez-nous</span>
              <div className="social-links">
                <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
                <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
                <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
