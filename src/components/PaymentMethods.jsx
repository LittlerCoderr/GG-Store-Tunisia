import React from 'react';
import './PaymentMethods.css';

const PaymentMethods = () => {
  return (
    <section id="payment" className="section payment-section">
      <div className="container">
        <h2 className="section-title">Accepted <span className="text-gradient">Payments</span></h2>
        <p className="payment-subtitle">Fast, secure, and reliable payment options</p>
        
        <div className="payment-grid">
          <div className="card payment-card">
            <div className="payment-icon d17-icon">D17</div>
            <h3>D17 App</h3>
          </div>
          
          <div className="card payment-card">
            <div className="payment-icon sobflous-icon">Sobflous</div>
            <h3>Sobflous</h3>
          </div>
          
          <div className="card payment-card">
            <div className="payment-icon crypto-icon">₿</div>
            <h3>Crypto (USDT/BTC)</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
