import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Wrench, PenTool } from 'lucide-react';
import './Services.css';

const services = [
  {
    icon: <Monitor size={28} />,
    title: 'Création Web',
    description: 'Des sites web magnifiques, réactifs et accessibles, soigneusement adaptés à votre identité de marque.'
  },
  {
    icon: <PenTool size={28} />,
    title: 'Design Graphique',
    description: 'Des identités visuelles marquantes, des supports marketing captivants et une conception cohérente.'
  },
  {
    icon: <Wrench size={28} />,
    title: 'Maintenance',
    description: 'Un support proactif, des mises à jour transparentes et une optimisation continue des performances.'
  }
];

const Services = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="label" style={{ color: 'var(--color-teal)', marginBottom: '0.5rem' }}>Notre Expertise</h2>
          <h3 className="section-title">Des Solutions Complètes</h3>
        </div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, idx) => (
            <motion.div key={idx} className="service-card" variants={cardVariants}>
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h4 className="service-title">{service.title}</h4>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
