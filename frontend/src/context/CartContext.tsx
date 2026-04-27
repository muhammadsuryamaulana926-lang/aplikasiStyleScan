import React, { createContext, useContext, useState, useEffect } from 'react';
import { ambil_tersimpan } from '../services/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const refreshCart = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const res = await ambil_tersimpan(user.id_pengguna);
      setCartCount(res.tersimpan?.length || 0);
    } catch (e) {
      console.error("Gagal refresh cart:", e);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [user]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
