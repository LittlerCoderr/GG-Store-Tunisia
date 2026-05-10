import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Wallet, ShoppingBag, Settings, RefreshCw,
  Save, Camera, CheckCircle, AlertCircle, Copy, Check,
  TrendingUp, Package, ArrowUpRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, updateUserEmail } from '../firebase/authService';
import { getWalletTransactions, getPurchaseHistory } from '../firebase/walletService';
import styles from './UserProfile.module.css';

/* ─── Tab Config ────────────────────────────────────────── */
const TABS = [
  { id: 'profile',   label: 'Profile',   icon: User },
  { id: 'wallet',    label: 'Wallet',    icon: Wallet },
  { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
  { id: 'settings',  label: 'Settings',  icon: Settings },
];

/* ─── Page transition variants ─────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -24 },
};

/* ─── Helpers ───────────────────────────────────────────── */
const formatDate = (ts) => {
  if (!ts) return '—';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const StatusBadge = ({ status }) => (
  <span className={`${styles.badge} ${status === 'approved' ? styles.badgeApproved : styles.badgePending}`}>
    {status === 'approved' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
    {status === 'approved' ? 'Approved' : 'Pending'}
  </span>
);

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={styles.copyBtn} onClick={handle} title="Copy code">
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const UserProfile = () => {
  const { currentUser, userData, refreshUserData } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  /* Profile tab state */
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail]             = useState('');
  const [photoURL, setPhotoURL]       = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg]   = useState(null); // { type: 'success'|'error', text }

  /* Wallet tab state */
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading]       = useState(false);
  const [balanceRefreshing, setBalanceRefreshing] = useState(false);

  /* Purchases tab state */
  const [purchases, setPurchases]     = useState([]);
  const [purchLoading, setPurchLoading] = useState(false);

  /* Sync form with userData */
  useEffect(() => {
    if (userData) {
      setDisplayName(userData.displayName || '');
      setEmail(userData.email || '');
      setPhotoURL(userData.photoURL || '');
    }
  }, [userData]);

  /* Load wallet transactions when tab selected */
  const loadTransactions = useCallback(async () => {
    if (!currentUser) return;
    setTxLoading(true);
    try {
      const data = await getWalletTransactions(currentUser.uid);
      setTransactions(data);
    } catch (e) {
      console.error(e);
    } finally {
      setTxLoading(false);
    }
  }, [currentUser]);

  /* Load purchase history when tab selected */
  const loadPurchases = useCallback(async () => {
    if (!currentUser) return;
    setPurchLoading(true);
    try {
      const data = await getPurchaseHistory(currentUser.uid);
      setPurchases(data);
    } catch (e) {
      console.error(e);
    } finally {
      setPurchLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeTab === 'wallet')    loadTransactions();
    if (activeTab === 'purchases') loadPurchases();
  }, [activeTab, loadTransactions, loadPurchases]);

  /* Refresh balance */
  const handleRefreshBalance = async () => {
    setBalanceRefreshing(true);
    await refreshUserData();
    setTimeout(() => setBalanceRefreshing(false), 600);
  };

  /* Save profile */
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMsg(null);
    try {
      const updates = {};
      if (displayName !== userData?.displayName) updates.displayName = displayName;
      if (photoURL    !== userData?.photoURL)    updates.photoURL    = photoURL;

      if (Object.keys(updates).length > 0) {
        await updateUserProfile(currentUser.uid, updates);
      }

      // Email change (requires re-auth in production — simplified here)
      if (email !== userData?.email) {
        await updateUserEmail(currentUser.uid, email);
      }

      await refreshUserData();
      setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to save changes.' });
    } finally {
      setProfileSaving(false);
      setTimeout(() => setProfileMsg(null), 4000);
    }
  };

  const balance = userData?.balance ?? 0;
  const avatarLetter = (userData?.displayName || userData?.email || '?')[0].toUpperCase();

  /* ─── Render Tabs ───────────────────────────────────── */

  const renderProfile = () => (
    <motion.div key="profile" {...pageVariants} transition={{ duration: 0.25 }} className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Profile Settings</h2>
        <p className={styles.sectionSub}>Manage your display information and account details</p>
      </div>

      <form className={styles.profileForm} onSubmit={handleSaveProfile}>
        {/* Avatar Preview */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarLarge}>
            {userData?.photoURL ? (
              <img src={userData.photoURL} alt="Avatar" className={styles.avatarImg} />
            ) : (
              <span className={styles.avatarLetterLg}>{avatarLetter}</span>
            )}
            <div className={styles.avatarOverlay}>
              <Camera size={20} />
            </div>
          </div>
          <div className={styles.avatarInfo}>
            <p className={styles.avatarName}>{userData?.displayName || 'Anonymous'}</p>
            <p className={styles.avatarEmail}>{userData?.email}</p>
          </div>
        </div>

        {/* Fields */}
        <div className={styles.fieldGrid}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>Display Name</label>
            <div className={styles.fieldInput}>
              <User size={16} className={styles.fieldIcon} />
              <input
                id="profile-displayname"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your display name"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.fieldLabel}>Email Address</label>
            <div className={styles.fieldInput}>
              <User size={16} className={styles.fieldIcon} />
              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label className={styles.fieldLabel}>Profile Picture URL</label>
            <div className={styles.fieldInput}>
              <Camera size={16} className={styles.fieldIcon} />
              <input
                id="profile-photourl"
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.png"
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <AnimatePresence>
          {profileMsg && (
            <motion.div
              className={`${styles.profileMsg} ${profileMsg.type === 'success' ? styles.msgSuccess : styles.msgError}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {profileMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              {profileMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          id="profile-save-btn"
          type="submit"
          className={styles.saveBtn}
          disabled={profileSaving}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {profileSaving ? <span className={styles.spinner} /> : <Save size={18} />}
          {profileSaving ? 'Saving…' : 'Save Changes'}
        </motion.button>
      </form>
    </motion.div>
  );

  const renderWallet = () => (
    <motion.div key="wallet" {...pageVariants} transition={{ duration: 0.25 }} className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Wallet</h2>
        <p className={styles.sectionSub}>Your GG-Store balance and top-up history</p>
      </div>

      {/* Neon Balance Card */}
      <div className={styles.balanceCard}>
        <div className={styles.balanceCardGlow} />
        <div className={styles.balanceTop}>
          <div className={styles.balanceLabel}>
            <TrendingUp size={16} />
            Available Balance
          </div>
          <button
            className={`${styles.refreshBtn} ${balanceRefreshing ? styles.spinning : ''}`}
            onClick={handleRefreshBalance}
            title="Refresh balance"
            id="wallet-refresh-btn"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        <div className={styles.balanceAmount}>
          <span className={styles.balanceNumber}>{balance.toFixed(2)}</span>
          <span className={styles.balanceCurrency}>TND</span>
        </div>
        <div className={styles.balanceFooter}>
          <span className={styles.balanceReadOnly}>Balance managed by admin</span>
        </div>
      </div>

      {/* Top-up History */}
      <div className={styles.historySection}>
        <h3 className={styles.historyTitle}>
          <ArrowUpRight size={18} /> Top-up History
        </h3>

        {txLoading ? (
          <div className={styles.loadingRow}>
            <span className={styles.spinner} />
            <span>Loading transactions…</span>
          </div>
        ) : transactions.length === 0 ? (
          <div className={styles.emptyState}>
            <Wallet size={40} className={styles.emptyIcon} />
            <p>No top-ups yet</p>
            <span>Contact support to add funds to your wallet</span>
          </div>
        ) : (
          <div className={styles.txTable}>
            <div className={styles.txHeader}>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                className={styles.txRow}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className={styles.txDate}>{formatDate(tx.date)}</span>
                <span className={styles.txAmount}>+{tx.amount?.toFixed(2)} TND</span>
                <StatusBadge status={tx.status} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderPurchases = () => (
    <motion.div key="purchases" {...pageVariants} transition={{ duration: 0.25 }} className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Purchase History</h2>
        <p className={styles.sectionSub}>All your orders and generated codes</p>
      </div>

      {purchLoading ? (
        <div className={styles.loadingRow}>
          <span className={styles.spinner} />
          <span>Loading purchases…</span>
        </div>
      ) : purchases.length === 0 ? (
        <div className={styles.emptyState}>
          <ShoppingBag size={40} className={styles.emptyIcon} />
          <p>No purchases yet</p>
          <span>Items you buy will appear here with their codes</span>
        </div>
      ) : (
        <div className={styles.purchaseList}>
          {purchases.map((p) => (
            <motion.div
              key={p.id}
              className={styles.purchaseCard}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.purchaseLeft}>
                <Package size={20} className={styles.purchaseIcon} />
                <div>
                  <p className={styles.purchaseItem}>{p.itemName}</p>
                  <p className={styles.purchaseDate}>{formatDate(p.date)}</p>
                </div>
              </div>
              <div className={styles.purchaseRight}>
                <span className={styles.purchasePrice}>{p.price?.toFixed(2)} TND</span>
                {p.generatedCode && (
                  <div className={styles.codeBlock}>
                    <span className={styles.codeText}>{p.generatedCode}</span>
                    <CopyButton text={p.generatedCode} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div key="settings" {...pageVariants} transition={{ duration: 0.25 }} className={styles.tabContent}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Settings</h2>
        <p className={styles.sectionSub}>Application preferences and security</p>
      </div>
      <div className={styles.settingsPlaceholder}>
        <Settings size={48} className={styles.emptyIcon} />
        <p>More settings coming soon</p>
        <span>Notification preferences, language, and security options will appear here</span>
      </div>
    </motion.div>
  );

  const tabContent = {
    profile:   renderProfile(),
    wallet:    renderWallet(),
    purchases: renderPurchases(),
    settings:  renderSettings(),
  };

  return (
    <div className={styles.page}>
      <div className={`container ${styles.layout}`}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          {/* User summary */}
          <div className={styles.sidebarUser}>
            <div className={styles.avatarMd}>
              {userData?.photoURL ? (
                <img src={userData.photoURL} alt="Avatar" className={styles.avatarImg} />
              ) : (
                <span>{avatarLetter}</span>
              )}
              <div className={styles.onlineDot} />
            </div>
            <div className={styles.sidebarUserInfo}>
              <p className={styles.sidebarName}>{userData?.displayName || 'Player'}</p>
              <p className={styles.sidebarBalance}>{balance.toFixed(2)} TND</p>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Nav tabs */}
          <nav className={styles.sidebarNav}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                id={`tab-${id}`}
                className={`${styles.navBtn} ${activeTab === id ? styles.navBtnActive : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={20} />
                <span>{label}</span>
                {activeTab === id && (
                  <motion.div
                    className={styles.navIndicator}
                    layoutId="navIndicator"
                    transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main className={styles.main}>
          <AnimatePresence mode="wait">
            {tabContent[activeTab]}
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default UserProfile;
