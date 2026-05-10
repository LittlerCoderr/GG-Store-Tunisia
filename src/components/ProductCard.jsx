import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useHover3D } from '../hooks/useHover3D';
import { useCart } from '../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, isFeatured }) => {
  const cardRef = useRef(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useHover3D(cardRef);
  const { addToCart } = useCart();

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.cardWrapper} ${isFeatured ? styles.featuredCard : ''}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div 
        className={styles.cardInner}
        style={{ '--brand-glow': product.brandColor || 'rgba(0, 112, 243, 0.5)' }}
      >
        <div className={styles.imageContainer}>
          <img
            src={product.imagePath.startsWith('http') ? product.imagePath : `${import.meta.env.BASE_URL}${product.imagePath}`}
            alt={product.title}
            className={styles.productImage}
          />
          {product.isTrending && <span className={styles.badge}>TRENDING</span>}
          {product.isPopular && <span className={styles.popularBadge}>POPULAR CHOICE</span>}
        </div>
        
        <div className={styles.dataLayer}>
          <p className={styles.category}>{product.gameCategory}</p>
          <h3 className={styles.title}>{product.title}</h3>
          
          <div className={styles.pricingRow}>
            <div className={styles.prices}>
              <span className={styles.originalPrice}>{product.originalPriceTND.toFixed(2)} TND</span>
              <span className={styles.discountedPrice}>{product.discountedPriceTND.toFixed(2)} TND</span>
            </div>
          </div>
          
          <button 
            className={styles.quickBuyBtn} 
            onClick={() => addToCart(product)}
            title="Quick Buy"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
