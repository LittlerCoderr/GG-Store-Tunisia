import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './InGameCurrencyHub.module.css';

const GiftCardsHub = ({ products }) => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Group products by Brand
  const groupedBrands = React.useMemo(() => {
    const map = new Map();
    products.forEach(p => {
      // Extract brand name based on title
      let brandName = "Other";
      if (p.title.includes("Steam")) brandName = "Steam Wallet";
      else if (p.title.includes("Epic")) brandName = "Epic Games";
      else brandName = p.title.split(' ')[0];

      if (!map.has(brandName)) {
        map.set(brandName, {
          name: brandName,
          imagePath: p.imagePath,
          variants: []
        });
      }
      map.get(brandName).variants.push(p);
    });
    
    // Sort variants by price ascending
    map.forEach(brand => {
      brand.variants.sort((a, b) => a.discountedPriceTND - b.discountedPriceTND);
    });

    return Array.from(map.values());
  }, [products]);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedVariant(brand.variants[0]); // Select lowest price variant by default
  };

  const handleBack = () => {
    setSelectedBrand(null);
    setSelectedVariant(null);
  };

  return (
    <div className={styles.hubContainer}>
      <AnimatePresence mode="wait">
        {!selectedBrand ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={styles.gameGrid}
          >
            {groupedBrands.map(brand => (
              <div 
                key={brand.name} 
                className={styles.gameCard}
                onClick={() => handleBrandSelect(brand)}
              >
                <div className={styles.imageWrapper}>
                  <motion.img 
                    src={`${import.meta.env.BASE_URL}${brand.imagePath}`}
                    alt={brand.name} 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
                <div className={styles.gameNameOverlay}>
                  {brand.name}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="pdp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.pdpContainer}
          >
            <button className={styles.backButton} onClick={handleBack}>
              <ArrowLeft size={20} /> Back to Gift Cards
            </button>

            <div className={styles.pdpLayout}>
              {/* Left Column: Visuals */}
              <div className={styles.visualColumn}>
                <div className={styles.posterWrapper}>
                  <motion.img 
                    src={`${import.meta.env.BASE_URL}${selectedBrand.imagePath}`}
                    alt={selectedBrand.name} 
                    className={styles.poster} 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                </div>
                <div className={styles.ratingBox}>
                  <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={18} fill="#FFD700" color="#FFD700" />
                    ))}
                  </div>
                  <span className={styles.reviewLink}>Trusted by thousands</span>
                </div>
              </div>

              {/* Center Column: Selection */}
              <div className={styles.selectionColumn}>
                <h3 className={styles.sectionTitle}>Choose Balance</h3>
                
                <div className={styles.platformRegion}>
                  <div className={styles.selector}>
                    <label>Region</label>
                    <select><option>Global</option><option>US</option><option>EU</option></select>
                  </div>
                </div>

                <div className={styles.variantGrid}>
                  {selectedBrand.variants.map(variant => {
                    // Extract amount text (e.g. "$10" from "Steam Wallet $10")
                    let amountText = variant.title.replace(selectedBrand.name, '').trim();
                    if (!amountText) amountText = variant.title;

                    const isSelected = selectedVariant && selectedVariant.id === variant.id;
                    
                    return (
                      <div 
                        key={variant.id}
                        className={`${styles.variantTile} ${isSelected ? styles.selected : ''}`}
                        onClick={() => setSelectedVariant(variant)}
                      >
                        <span className={styles.variantAmount}>{amountText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Checkout */}
              <div className={styles.checkoutColumn}>
                <div className={styles.purchaseBox}>
                  <div className={styles.trustBadge}>
                    <ShieldCheck size={18} />
                    <span>Instant Digital Delivery</span>
                  </div>
                  
                  <div className={styles.priceContainer}>
                    <div className={styles.priceLabel}>Total Price</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedVariant?.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={styles.dynamicPrice}
                      >
                        {selectedVariant?.discountedPriceTND.toFixed(2)} <span className={styles.currency}>TND</span>
                      </motion.div>
                    </AnimatePresence>
                    {selectedVariant?.originalPriceTND > selectedVariant?.discountedPriceTND && (
                      <div className={styles.originalPrice}>
                        {selectedVariant.originalPriceTND.toFixed(2)} TND
                      </div>
                    )}
                  </div>

                  <button 
                    className={styles.addToCartBtn}
                    onClick={() => {
                      if(selectedVariant) {
                        addToCart(selectedVariant);
                        navigate('/checkout');
                      }
                    }}
                  >
                    <div className={styles.btnLiquid}></div>
                    <span className={styles.btnText}>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftCardsHub;
