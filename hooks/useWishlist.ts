import { useState, useCallback } from 'react';
import { Product } from '../types';

export const useWishlist = () => {
  const [items, setItems] = useState<Product[]>([]);

  const addToWishlist = useCallback((product: Product) => {
    setItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return items.some(item => item.id === productId);
  }, [items]);

  const toggleWishlist = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [addToWishlist, removeFromWishlist, isInWishlist]);

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  };
};