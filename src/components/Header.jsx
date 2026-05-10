import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { signOutUser } from '../firebase/authService';
import AuthModal from './AuthModal';
import styles from './Header.module.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/category/currency', label: 'In-Game Currency' },
  { path: '/category/giftcard', label: 'Gift Cards' },
  { path: '/category/subscription', label: 'Subscriptions' },
];

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAuthModal, setShowAuthModal]     = useState(false);
  const [showUserMenu, setShowUserMenu]       = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { cartItems } = useCart();
  const { currentUser, userData } = useAuth();
  const menuRef = useRef(null);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    setShowUserMenu(false);
    navigate('/');
  };

  const avatarLetter = (userData?.displayName || userData?.email || '?')[0].toUpperCase();

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              className={styles.logoContainer}
              whileHover={{ textShadow: '0px 0px 8px rgba(0, 112, 243, 0.8)' }}
            >
              <span className={styles.logo}>GG-STORE</span>
            </motion.div>
          </Link>

          {/* Nav */}
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

          {/* Actions */}
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
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className={styles.cartBubble}
                >
                  {totalItems}
                </motion.div>
              )}
            </div>

            {/* Auth — logged out */}
            {!currentUser && (
              <button
                id="header-login-btn"
                className={styles.loginBtn}
                onClick={() => setShowAuthModal(true)}
              >
                <span>LOGIN</span>
                <div className={styles.liquidFill} />
              </button>
            )}

            {/* Auth — logged in */}
            {currentUser && (
              <div className={styles.userMenuWrapper} ref={menuRef}>
                <button
                  id="header-user-btn"
                  className={styles.avatarBtn}
                  onClick={() => setShowUserMenu((v) => !v)}
                >
                  {userData?.photoURL ? (
                    <img src={userData.photoURL} alt="avatar" className={styles.avatarThumb} />
                  ) : (
                    <span className={styles.avatarInitial}>{avatarLetter}</span>
                  )}
                  <ChevronDown
                    size={14}
                    className={`${styles.chevron} ${showUserMenu ? styles.chevronUp : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className={styles.userDropdown}
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className={styles.dropdownUser}>
                        <p className={styles.dropdownName}>{userData?.displayName || 'Player'}</p>
                        <p className={styles.dropdownEmail}>{userData?.email}</p>
                      </div>
                      <div className={styles.dropdownDivider} />
                      <Link
                        id="header-profile-link"
                        to="/profile"
                        className={styles.dropdownItem}
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={16} /> My Profile
                      </Link>
                      <button
                        id="header-signout-btn"
                        className={`${styles.dropdownItem} ${styles.dropdownSignout}`}
                        onClick={handleSignOut}
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Header;
