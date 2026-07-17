import React from 'react';
import { motion } from 'framer-motion';
import './GraphicDesign.css';

const designProjects = [
  {
    id: 1,
    title: 'Identité de Marque',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 2,
    title: 'Éditorial et Impression',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 3,
    title: 'Publicité Numérique',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000'
  }
];

const GraphicDesign = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="graphic-design" className="section graphic-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 className="label" style={{ color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Arts Visuels</h2>
          <h3 className="section-title">Design Graphique</h3>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            Au-delà du code, nous créons des expériences visuelles éblouissantes. D'un branding moderne à des visuels numériques attrayants, notre design fait la différence.
          </p>
        </div>

        <motion.div 
          className="design-gallery"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {designProjects.map((project) => (
            <motion.div key={project.id} className="design-card" variants={itemVariants}>
              <div className="design-image-wrapper">
                <img src={project.image} alt={project.title} className="design-image" loading="lazy" />
              </div>
              <div className="design-overlay">
                <h4 className="design-title">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GraphicDesign;
