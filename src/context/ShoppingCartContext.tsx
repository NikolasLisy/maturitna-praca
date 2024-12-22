"use client";

import { ClientShoppingCart } from "@/components/client-components/ClientShoppingCart";
import { createContext, ReactNode, useContext, useState } from "react";

type CartContextType = {
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  updateCartCount: (count: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  return (
    <CartContext.Provider
      value={{ cartCount, updateCartCount, openCart, closeCart }}
    >
      {children}
      <ClientShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart musí byť použitý v CartProvider");
  }
  return context;
}
