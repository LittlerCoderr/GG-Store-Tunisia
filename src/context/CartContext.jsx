import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsDrawerOpen(true);
    
    // Auto close drawer after 3 seconds for mock experience
    setTimeout(() => {
      setIsDrawerOpen(false);
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.discountedPriceTND * (item.quantity || 1)), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotal, isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
