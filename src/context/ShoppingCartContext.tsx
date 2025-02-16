"use client";

import { ClientShoppingCart } from "@/components/client-components/ClientShoppingCart";
import { useToast } from "@/hooks/use-toast";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  openCart: () => void;
  closeCart: () => void;
  cartCount: number;
  updateCartCount: (count: number) => void;
  products: Product[];
  cartItems: CartItem[];
  fetchCartItems: () => Promise<void>;
  addItemToCart: (productId: string) => void;
};

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const updateCartCount = (count: number) => {
    setCartCount(count);
  };

  const addItemToCart = async (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find((item) => item.productId === productId);

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Chyba",
          description: errorData.message || "Nepodarilo sa pridať produkt.",
          variant: "destructive",
        });
        return;
      }

      if (existingItem) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems((prev) => [
          ...prev,
          { productId, quantity: 1, price: product.price },
        ]);
      }

      setCartCount((prev) => prev + 1);
      toast({
        title: "Úspech",
        description: `${product.name} bol pridaný do košíka.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Chyba",
        description: "Nepodarilo sa pridať produkt do košíka.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const fetchCartItems = async () => {
    const response = await fetch("/api/cartItem");
    const data = await response.json();
    setCartItems(data);
    updateCartCount(data.length);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        updateCartCount,
        openCart,
        closeCart,
        products,
        cartItems,
        fetchCartItems,
        addItemToCart,
      }}
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
