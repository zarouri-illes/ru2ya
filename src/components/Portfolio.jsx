import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Button from './ui/Button';
import './Portfolio.css';

const projects = [
  { id: 1, title: 'Project Nexus', category: 'Plateforme Web', link: '#' },
  { id: 2, title: 'Ascend App', category: 'Application Mobile', link: '#' },
  { id: 3, title: 'Lumina Store', category: 'Création E-Commerce', link: '#' },
  { id: 4, title: 'Velocity Dashboard', category: 'Logiciel Sur-Mesure', link: '#' },
];

const Portfolio = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="portfolio" className="section portfolio-section">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 className="label" style={{ color: 'var(--color-cyan)', marginBottom: '0.5rem' }}>Notre Travail</h2>
            <h3 className="section-title" style={{ color: 'var(--color-bg-alt)' }}>Projets Phares</h3>
          </div>
          <div className="desktop-only">
            <Button variant="outline" style={{ borderColor: 'var(--color-bg-alt)', color: 'var(--color-bg-alt)' }}>
              Voir Tout
            </Button>
          </div>
        </div>

        <motion.div 
          className="portfolio-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} className="portfolio-card" variants={itemVariants}>
              <div className="portfolio-placeholder">
                <span className="placeholder-text">Aperçu du Projet<br/>{project.title}</span>
              </div>
              <div className="portfolio-overlay">
                <div style={{ flex: 1 }}>
                  <h4 className="portfolio-title">{project.title}</h4>
                  <p className="portfolio-category label">{project.category}</p>
                </div>
                <a href={project.link} className="project-link-btn" aria-label={`View ${project.title}`}>
                  <ArrowUpRight size={24} />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mobile-only" style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Button variant="outline" style={{ borderColor: 'var(--color-bg-alt)', color: 'var(--color-bg-alt)', width: '100%' }}>
            Voir Tout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
