import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateDiscount } from '../utils/formatCurrency';

const CartContext = createContext();

const CART_STORAGE_KEY = 'pawpet_cart';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    const finalPrice = calculateDiscount(product.price, product.discountPercentage);
    const prodId = product.id || product._id;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === prodId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        const cappedQty = Math.min(newQty, product.stock || 99);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: cappedQty,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: prodId,
            productId: prodId,
            name: product.name,
            brand: product.brand,
            price: finalPrice,
            originalPrice: product.price,
            discountPercentage: product.discountPercentage || 0,
            image: product.images?.[0] || '',
            stock: product.stock || 10,
            petType: product.petType,
            quantity: Math.min(quantity, product.stock || 99),
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const cappedQty = Math.min(newQuantity, item.stock || 99);
          return { ...item, quantity: cappedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculations
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const tax = 0; // Prices are tax-inclusive
  const totalAmount = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingFee,
        tax,
        totalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
