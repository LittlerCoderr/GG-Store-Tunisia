import React from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const iconVariants = {
  hover: { 
    scale: 1.15,
    filter: "drop-shadow(0 0 15px #0070f3)",
    transition: { 
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

const ServiceCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div 
      className={styles.serviceCard}
      variants={itemVariants}
      whileHover="hover"
    >
      <div className={styles.iconWrapper}>
        <div className={styles.iconGlow} />
        <motion.div variants={iconVariants} className={styles.iconContainer}>
          <Icon size={36} className={styles.icon} />
        </motion.div>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
