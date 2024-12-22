"use client";

import { useCart } from "@/context/ShoppingCartContext";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type ClientShoppingCartProps = {
  isOpen: boolean;
};

export function ClientShoppingCart({ isOpen }: ClientShoppingCartProps) {
  const { closeCart } = useCart();

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-1/2 lg:w-1/3 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
      >
        <div className="relative p-4">
          <div className="flex items-center justify-between pb-8">
            <Button
              className="absolute top-2 right-2 text-xl"
              onClick={closeCart}
            >
              <X />
            </Button>
            <h2 className="text-lg font-semibold">Nákupný košík</h2>
          </div>
          <div>
            <p>Obsah nákupného košíka</p>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeCart}
        ></div>
      )}
    </>
  );
}
