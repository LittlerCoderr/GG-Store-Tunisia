import React from 'react';
import styles from './CommunityPortal.module.css';

const CommunityPortal = () => {
  return (
    <section className={`section ${styles.portalSection}`}>
      <div className={styles.gridOverlay}></div>
      <div className={styles.glowingOrb}></div>
      
      <div className={`container ${styles.portalContainer}`}>
        <h2 className={styles.portalTitle}>Enter the Mainframe</h2>
        <p className={styles.portalSubtext}>Join thousands of players in the GG-Store Discord.</p>
        
        <a href="https://discord.gg/8AFCMq8xZV" target="_blank" rel="noopener noreferrer" className={styles.glitchBtn}>
          <span className={styles.btnText}>CONNECT TO DISCORD</span>
        </a>
      </div>
    </section>
  );
};

export default CommunityPortal;
