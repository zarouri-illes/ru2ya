import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background">
        <motion.div 
          className="gradient-orb orb-1"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="gradient-orb orb-2"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={itemVariants}>
            Nous transformons votre <br/><span className="gradient-text">vision</span> en réalité.
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Nous propulsons les entreprises grâce à une ingénierie de pointe et un design moderne. Nous fournissons des sites web haut de gamme et des solutions sur mesure.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <Button>Démarrer un Projet</Button>
            <Button variant="outline">Nos Réalisations</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
