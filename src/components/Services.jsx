import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wallet, Bitcoin, Shield } from 'lucide-react';
import ServiceCard from './ServiceCard';
import styles from './Services.module.css';

const servicesData = [
  {
    id: 1,
    title: 'Instant shipping',
    description: 'Instant delivery of game codes and top-ups directly to your account within seconds of payment.',
    icon: Zap
  },
  {
    id: 2,
    title: 'Tunisian Payment Matrix',
    description: 'Pay conveniently using local methods like D17 and Sobflous. No international cards required.',
    icon: Wallet
  },
  {
    id: 3,
    title: 'Crypto Gateway',
    description: 'Futuristic checkout for tech-savvy gamers. We securely accept USDT and BTC.',
    icon: Bitcoin
  },
  {
    id: 4,
    title: 'Ongoing technical support',
    description: 'Elite 24/7 support via Discord from our dedicated team that understands the Tunisian gaming community.',
    icon: Shield
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Services = () => {
  return (
    <section className={styles.servicesSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>WHY CHOOSE GG-STORE?</h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {servicesData.map(service => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
