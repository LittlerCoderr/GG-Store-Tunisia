import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { signInWithEmail, signUpWithEmail } from '../firebase/authService';
import { useAuth } from '../context/AuthContext';
import styles from './AuthModal.module.css';

const AuthModal = ({ onClose }) => {
  const [tab, setTab] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { refreshUserData } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tab === 'signin') {
        await signInWithEmail(email, password);
      } else {
        if (!displayName.trim()) {
          setError('Display name is required.');
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, displayName.trim());
      }
      await refreshUserData();
      onClose();
    } catch (err) {
      const messages = {
        'auth/email-already-in-use': 'This email is already registered.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential': 'Invalid credentials. Please check your email and password.',
        'auth/operation-not-allowed': 'Email/Password accounts are not enabled in Firebase Console.',
      };
      setError(messages[err.code] || `Error: ${err.code || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (newTab) => {
    setTab(newTab);
    setError('');
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={styles.logoMark}>GG</div>
            <button className={styles.closeBtn} onClick={onClose} id="auth-modal-close">
              <X size={20} />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className={styles.tabSwitcher}>
            <button
              id="auth-tab-signin"
              className={`${styles.tabBtn} ${tab === 'signin' ? styles.activeTab : ''}`}
              onClick={() => switchTab('signin')}
            >
              <LogIn size={16} /> Sign In
            </button>
            <button
              id="auth-tab-signup"
              className={`${styles.tabBtn} ${tab === 'signup' ? styles.activeTab : ''}`}
              onClick={() => switchTab('signup')}
            >
              <UserPlus size={16} /> Sign Up
            </button>
            <motion.div
              className={styles.tabIndicator}
              animate={{ x: tab === 'signin' ? '0%' : '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            />
          </div>

          {/* Title */}
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>
              {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={styles.subtitle}>
              {tab === 'signin'
                ? 'Sign in to access your wallet and purchases'
                : 'Join GG-Store and start gaming'}
            </p>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {tab === 'signup' && (
                <motion.div
                  key="displayName"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className={styles.inputGroup}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      id="auth-displayname"
                      type="text"
                      placeholder="Display Name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={styles.input}
                      autoComplete="name"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.inputGroup}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                id="auth-email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.inputGroup}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
                autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <motion.p
                className={styles.errorMsg}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              id="auth-submit-btn"
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className={styles.spinner} />
              ) : tab === 'signin' ? (
                <><LogIn size={18} /> Sign In</>
              ) : (
                <><UserPlus size={18} /> Create Account</>
              )}
            </motion.button>
          </form>

          <p className={styles.switchText}>
            {tab === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              className={styles.switchLink}
              onClick={() => switchTab(tab === 'signin' ? 'signup' : 'signin')}
            >
              {tab === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
