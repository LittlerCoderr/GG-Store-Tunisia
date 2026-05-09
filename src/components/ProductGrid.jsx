import React from 'react';
import { motion } from 'framer-motion';
import { mockProducts } from '../data/mockProducts';
import ProductCard from './ProductCard';
import InGameCurrencyHub from './InGameCurrencyHub';
import GiftCardsHub from './GiftCardsHub';
import SubscriptionsHub from './SubscriptionsHub';
import styles from './ProductGrid.module.css';

const slices = [
  { id: 'currency', label: 'In-Game Currency', filter: (p) => p.category === 'currency' },
  { id: 'giftcard', label: 'Digital Gift Cards', filter: (p) => p.category === 'giftcard' },
  { id: 'subscription', label: 'Subscriptions', filter: (p) => p.category === 'subscription' }
];

const ProductGrid = ({ categoryId }) => {
  const activeSlices = categoryId 
    ? slices.filter(s => s.id === categoryId) 
    : slices;

  if (activeSlices.length === 0) {
    return (
      <section id="arsenal" className="section">
        <div className="container">
           <h2 className="section-title">Category Not Found</h2>
        </div>
      </section>
    );
  }

  return (
    <section id="arsenal" className="section" style={{ paddingTop: '100px', minHeight: '60vh' }}>
      <div className="container">
        
        {activeSlices.map(slice => {
          let products = mockProducts.filter(slice.filter);

          if (products.length === 0) return null;

          if (slice.id === 'currency') {
            return (
              <div key={slice.id} className={styles.categorySlice}>
                <div className={styles.sliceHeader}>
                  <h2 className={styles.sliceTitle}>{slice.label}</h2>
                </div>
                <InGameCurrencyHub products={products} />
              </div>
            );
          }

          if (slice.id === 'giftcard') {
            return (
              <div key={slice.id} className={styles.categorySlice}>
                <div className={styles.sliceHeader}>
                  <h2 className={styles.sliceTitle}>{slice.label}</h2>
                </div>
                <GiftCardsHub products={products} />
              </div>
            );
          }

          if (slice.id === 'subscription') {
            return (
              <div key={slice.id} className={styles.categorySlice}>
                <div className={styles.sliceHeader}>
                  <h2 className={styles.sliceTitle}>{slice.label}</h2>
                </div>
                <SubscriptionsHub products={products} />
              </div>
            );
          }

          return (
            <div key={slice.id} className={styles.categorySlice}>
              <div className={styles.sliceHeader}>
                <h2 className={styles.sliceTitle}>{slice.label}</h2>
              </div>
              
              <div className={styles.sliceGrid}>
                {products.map((product) => (
                  <div key={product.id} className={styles.sliceItem}>
                    <ProductCard 
                      product={product} 
                      isFeatured={false} 
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default ProductGrid;
