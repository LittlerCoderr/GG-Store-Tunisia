import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('email');

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      alert("Please select a payment method.");
      return;
    }
    alert("Checkout initiated securely via " + selectedPayment.toUpperCase() + "!");
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.checkoutPage}>
        <div className={styles.emptyCartContainer}>
          <h2 className={styles.emptyTitle}>Your Arsenal is Empty</h2>
          <p className={styles.emptyText}>Looks like you haven't added anything to your cart yet.</p>
          <button className={styles.returnBtn} onClick={() => navigate('/')}>
            <ArrowLeft size={20} /> Return to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className="container">
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} /> Back
        </button>
        
        <h1 className={styles.pageTitle}>Secure Checkout</h1>
        
        <div className={styles.checkoutLayout}>
          
          {/* Left Column: Summary & Info */}
          <div className={styles.leftColumn}>
            
            <div className={styles.glassPanel}>
              <h2 className={styles.panelTitle}>Order Summary</h2>
              <div className={styles.cartList}>
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                      className={styles.cartItem}
                    >
                      <img src={item.imagePath} alt={item.title} className={styles.itemThumb} />
                      <div className={styles.itemDetails}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        <div className={styles.itemPrice}>{item.discountedPriceTND.toFixed(2)} TND x {item.quantity}</div>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className={styles.glassPanel}>
              <h2 className={styles.panelTitle}>How should we deliver your order?</h2>
              <div className={styles.deliveryMethods}>
                <div 
                  className={`${styles.paymentTile} ${deliveryMethod === 'email' ? styles.selected : ''}`}
                  onClick={() => setDeliveryMethod('email')}
                >
                  <div className={styles.payIcon}>📧</div>
                  <span>Email</span>
                </div>
                <div 
                  className={`${styles.paymentTile} ${deliveryMethod === 'whatsapp' ? styles.selected : ''}`}
                  onClick={() => setDeliveryMethod('whatsapp')}
                >
                  <div className={styles.payIcon}>💬</div>
                  <span>WhatsApp</span>
                </div>
              </div>
            </div>

            <div className={styles.glassPanel}>
              <h2 className={styles.panelTitle}>Player Details</h2>
              <form id="checkout-form" className={styles.infoForm} onSubmit={handleCheckout}>
                <div className={styles.inputGroup}>
                  {deliveryMethod === 'email' ? (
                    <>
                      <label>Email Address</label>
                      <input type="email" placeholder="enter@your.email" required />
                    </>
                  ) : (
                    <>
                      <label>WhatsApp Number</label>
                      <input type="tel" placeholder="+1 (234) 567-8900" required />
                    </>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label>Player ID / UID (For in-game topups)</label>
                  <input type="text" placeholder="e.g. 1234567890" />
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: Payment & Total */}
          <div className={styles.rightColumn}>
            
            <div className={styles.glassPanel}>
              <h2 className={styles.panelTitle}>Payment Method</h2>
              <div className={styles.paymentMethods}>
                <div 
                  className={`${styles.paymentTile} ${selectedPayment === 'd17' ? styles.selected : ''}`}
                  onClick={() => setSelectedPayment('d17')}
                >
                  <div className={styles.payIcon}>D17</div>
                  <span>D17 Application</span>
                </div>
                <div 
                  className={`${styles.paymentTile} ${selectedPayment === 'flouci' ? styles.selected : ''}`}
                  onClick={() => setSelectedPayment('flouci')}
                >
                  <div className={styles.payIcon}>FL</div>
                  <span>Flouci Wallet</span>
                </div>
                <div 
                  className={`${styles.paymentTile} ${selectedPayment === 'crypto' ? styles.selected : ''}`}
                  onClick={() => setSelectedPayment('crypto')}
                >
                  <div className={styles.payIcon}>₿</div>
                  <span>Cryptocurrency</span>
                </div>
              </div>
            </div>

            <div className={styles.summaryPanel}>
              <div className={styles.totalRow}>
                <span>Total Amount</span>
                <span className={styles.totalPrice}>{getCartTotal().toFixed(2)} TND</span>
              </div>
              
              <div className={styles.trustBadge}>
                <ShieldCheck size={16} /> Secured by 256-bit SSL
              </div>

              <button type="submit" form="checkout-form" className={styles.payNowBtn}>
                <CreditCard size={20} />
                Pay Now
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
