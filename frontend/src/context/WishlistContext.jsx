import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = 'pawpet_wishlist';

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [items]);

  const isInWishlist = (productId) => {
    if (!productId) return false;
    return items.some((item) => (item.id || item._id) === (productId.id || productId._id || productId));
  };

  const addToWishlist = (product) => {
    const prodId = product.id || product._id;
    if (!isInWishlist(prodId)) {
      setItems((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    const targetId = typeof productId === 'object' ? (productId.id || productId._id) : productId;
    setItems((prev) => prev.filter((item) => (item.id || item._id) !== targetId));
  };

  const toggleWishlist = (product) => {
    const prodId = product.id || product._id;
    if (isInWishlist(prodId)) {
      removeFromWishlist(prodId);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const itemCount = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
