import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from './InGameCurrencyHub.module.css';

const InGameCurrencyHub = ({ products }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Group products by Game
  const groupedGames = React.useMemo(() => {
    const map = new Map();
    products.forEach(p => {
      // Extract game name based on title
      let gameName = "Other";
      if (p.title.includes("Free Fire")) gameName = "Free Fire";
      else if (p.title.includes("Valorant")) gameName = "Valorant";
      else if (p.title.includes("PUBG Mobile")) gameName = "PUBG Mobile";
      else if (p.title.includes("CS2")) gameName = "Counter-Strike 2";
      else if (p.title.includes("Apex Legends")) gameName = "Apex Legends";
      else if (p.title.includes("League of Legends")) gameName = "League of Legends";
      else if (p.title.includes("Fortnite")) gameName = "Fortnite";
      else if (p.title.includes("Roblox")) gameName = "Roblox";
      else if (p.title.includes("Steam")) gameName = "Steam Wallet";
      else if (p.title.includes("Genshin Impact")) gameName = "Genshin Impact";
      else if (p.title.includes("EA Sports FC")) gameName = "EA Sports FC 26";
      else gameName = p.title;

      if (!map.has(gameName)) {
        map.set(gameName, {
          name: gameName,
          imagePath: p.imagePath,
          variants: []
        });
      }
      map.get(gameName).variants.push(p);
    });

    // Sort variants by price ascending
    map.forEach(game => {
      game.variants.sort((a, b) => a.discountedPriceTND - b.discountedPriceTND);
    });

    return Array.from(map.values());
  }, [products]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setSelectedVariant(game.variants[0]); // Select lowest price variant by default
  };

  const handleBack = () => {
    setSelectedGame(null);
    setSelectedVariant(null);
  };

  return (
    <div className={styles.hubContainer}>
      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className={styles.gameGrid}
          >
            {groupedGames.map(game => (
              <div
                key={game.name}
                className={styles.gameCard}
                onClick={() => handleGameSelect(game)}
              >
                <div className={styles.imageWrapper}>
                  <motion.img 
                    src={game.imagePath} 
                    alt={game.name} 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
                <div className={styles.gameNameOverlay}>
                  {game.name}
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
              <ArrowLeft size={20} /> Back to Games
            </button>

            <div className={styles.pdpLayout}>
              {/* Left Column: Visuals */}
              <div className={styles.visualColumn}>
                <div className={styles.posterWrapper}>
                  <motion.img 
                    src={selectedGame.imagePath} 
                    alt={selectedGame.name} 
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
                  <span className={styles.reviewLink}>9 reviews</span>
                </div>
              </div>

              {/* Center Column: Selection */}
              <div className={styles.selectionColumn}>
                <h3 className={styles.sectionTitle}>Choose Amount</h3>

                <div className={styles.platformRegion}>
                  <div className={styles.selector}>
                    <label>Platform</label>
                    <select><option>Global</option><option>PC/Mobile</option></select>
                  </div>
                </div>

                <div className={styles.variantGrid}>
                  {selectedGame.variants.map(variant => {
                    // Extract amount text (e.g. "210 Diamonds" from "Free Fire 210 Diamonds")
                    let amountText = variant.title.replace(selectedGame.name, '').trim();
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
                    <span>100% Positive Feedback</span>
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
                      if (selectedVariant) {
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

export default InGameCurrencyHub;
