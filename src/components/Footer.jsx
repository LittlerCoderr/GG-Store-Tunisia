import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h4>Products</h4>
            <ul>
              <li><a href="#trending">Trending Deals</a></li>
              <li><a href="#topups">Game Top-ups</a></li>
              <li><a href="#giftcards">Gift Cards</a></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Support</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#refunds">Refund Policy</a></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Legal</h4>
            <ul>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div className={styles.footerCol}>
            <h4>Socials</h4>
            <ul>
              <li><a href="https://discord.gg/8AFCMq8xZV" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#instagram">Instagram</a></li>
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />
        
        <div className={styles.footerBottom}>
          <div className={styles.logo}>GG-STORE</div>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} GG-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
