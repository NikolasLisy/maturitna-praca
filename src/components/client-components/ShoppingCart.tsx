"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/context/ShoppingCartContext";

export function ShoppingCarts() {
  const { cartCount, openCart } = useCart();

  return (
    <Button onClick={openCart} className="relative">
      <ShoppingCart />
      {cartCount > 0 && (
        <div className="rounded bg-red-500 pl-2 pr-2 absolute -bottom-1 -right-2">
          {cartCount}
        </div>
      )}
    </Button>
  );
}
