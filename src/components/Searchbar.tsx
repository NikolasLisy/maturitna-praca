"use client";

import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import db from "@/lib/db";
import { useState } from "react";
import { useRouter } from "next/router";

async function SearchFunctionality(input: string) {
  const products = await db.product.findMany();
  const productsSearch: string[] = [];

  products.forEach((product) => {
    const authorNames = product.authorName;
    const productNames = product.name;
    productsSearch.push(authorNames, productNames);
  });

  for (let i = 0; i < productsSearch.length; i++) {
    if (productsSearch[i].toLowerCase().includes(input.toLowerCase())) {
      return productsSearch[i];
    }
  }
}

export function Searchbar() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/products?serach=${encodeURIComponent(input.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="block md:hidden left-0 right-0 top-[97px] bg-white px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 border-b border-zinc-200">
      <div className="flex items-center justify-center pb-4">
        <Input
          className="w-full rounded-tr-none rounded-br-none"
          placeholder="Zadajte názov knihy, autora"
          value={input}
        />
        <Button
          onClick={handleSearch}
          className="rounded-tl-none rounded-bl-none"
        >
          <Search size={20} />
        </Button>
      </div>
    </div>
  );
}
