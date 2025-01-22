"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/context/ShoppingCartContext";

export function ShoppingCarts() {
  const { openCart } = useCart();

  return (
    <Button onClick={openCart} className="relative">
      <ShoppingCart />
    </Button>
  );
}
