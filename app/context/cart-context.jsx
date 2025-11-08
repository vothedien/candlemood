"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback(product => {
    if (!product?.id) return;
    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceDisplay: product.priceDisplay,
          mood: product.mood,
          quantity: 1,
        },
      ];
    });
  }, []);

  const decrementItem = useCallback(productId => {
    setItems(prevItems =>
      prevItems
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter(item => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback(productId => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(() => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalCost = items.reduce(
      (total, item) => total + (item.price ?? 0) * item.quantity,
      0,
    );

    return {
      items,
      addItem,
      decrementItem,
      removeItem,
      clearCart,
      totalItems,
      totalCost,
    };
  }, [items, addItem, decrementItem, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
