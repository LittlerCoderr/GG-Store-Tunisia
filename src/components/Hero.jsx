import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { delay: 1, duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className={styles.heroSection}>
      {/* Background Video */}
      <video 
        className={styles.bgVideo}
        src="/bg-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Dark Overlay */}
      <div className={styles.darkOverlay} />
      
      {/* Scanline / Cyberpunk Noise Overlay */}
      <div className={styles.scanlines} />

      <div className={`container ${styles.heroGrid}`}>
        
        {/* Left Content Box */}
        <motion.div 
          className={styles.contentBox}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className={styles.mainHeading}>
            Get Ready to <span className={styles.neonHighlight}>Play</span>,<br/>
            <span className={styles.neonHighlight}>Explore</span>, Conquer
          </h1>
          <p className={styles.subtext}>
            Join the ultimate Tunisian gaming community. Instant delivery, localized payments, and 24/7 elite support tailored for true gamers.
          </p>
          
          <div className={styles.buttonGroup}>
            <button className={styles.playNowBtn}>Play Now</button>
            <button className={styles.learnMoreBtn}>Learn More</button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
