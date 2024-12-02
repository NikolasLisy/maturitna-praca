"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/client-components/ProductCard";
import { Loader2 } from "lucide-react";

const fetchProducts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Nepodarilo sa nájsť produkt");
  }

  return response.json();
};

export default function ProductsPage() {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts(
          `/api/search/products?q=${encodedSearchQuery}`
        );
        setProducts(data.products || []);
      } catch (error) {
        setError("Nastala chyba pri načítaní produktov");
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [encodedSearchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader2 className="size-24 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => <ProductCard {...product} />)
        ) : (
          <p>Žiadne produkty nenájdené</p>
        )}
      </div>
    </div>
  );
}
