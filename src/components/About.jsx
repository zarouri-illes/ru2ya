import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const stats = [
  { label: 'Projets Livrés', value: '40+' },
  { label: 'Clients Satisfaits', value: '100%' },
  { label: 'Années d\'Expérience', value: '10+' }
];

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container about-container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="label" style={{ color: 'var(--color-teal)', marginBottom: '1rem' }}>Notre Philosophie</h2>
          <h3 className="section-title">Guidé par la vision. <br />Propulsé par la précision.</h3>
          <p className="about-description">
            Chez ru2ya, nous croyons qu'un bon logiciel ne se limite pas au code : il s'agit de comprendre vos objectifs fondamentaux et de concevoir une architecture évolutive. Nous allions des technologies de pointe à un design haut de gamme pour créer des plateformes non seulement fonctionnelles, mais exceptionnelles.
          </p>
        </motion.div>

        <motion.div 
          className="about-stats"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <h4 className="stat-value display-font gradient-text">{stat.value}</h4>
              <p className="stat-label label">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
