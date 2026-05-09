import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './Header.module.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/category/currency', label: 'In-Game Currency' },
  { path: '/category/giftcard', label: 'Gift Cards' },
  { path: '/category/subscription', label: 'Subscriptions' }
];

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        
        {/* Left Sector: Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            className={styles.logoContainer}
            whileHover={{ textShadow: "0px 0px 8px rgba(0, 112, 243, 0.8)" }}
          >
            <span className={styles.logo}>GG-STORE</span>
          </motion.div>
        </Link>

        {/* Center Sector: Navigation */}
        <nav className={styles.nav}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path}
                className={styles.navItem}
                style={{ textDecoration: 'none' }}
              >
                <span className={`${styles.navLabel} ${isActive ? styles.activeLabel : ''}`}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className={styles.navUnderline}
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Sector: Actions */}
        <div className={styles.actions}>
          <div className={`${styles.searchWrapper} ${isSearchFocused ? styles.searchFocused : ''}`}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search games..." 
              className={styles.searchInput}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
          
          <div className={styles.cartIconWrapper} onClick={() => navigate('/checkout')}>
            <ShoppingCart size={24} color="white" className={styles.cartIcon} />
            {totalItems > 0 && (
              <motion.div 
                key={totalItems}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className={styles.cartBubble}
              >
                {totalItems}
              </motion.div>
            )}
          </div>

          <button className={styles.loginBtn}>
            <span>LOGIN</span>
            <div className={styles.liquidFill} />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
