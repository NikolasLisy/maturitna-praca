"use client";

import { ProductSwiper } from "@/components/client-components/ProductSwiper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/context/ShoppingCartContext";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/formatters";
import { ArrowRight, Loader2, Truck } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  authorName: string;
  imagePath: string;
  publisher: string;
  price: number;
  stock: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function EachProdcutPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchAllProducts();
  }, []);

  if (!product || !products) {
    return (
      <div className="flex justify-center">
        <Loader2 className="size-24 animate-spin" />
      </div>
    );
  }

  const { updateCartCount } = useCart();

  const handleAddToCart = async () => {
    if (!session) {
      router.push("/sign-in");
      return;
    }

    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      const countResponse = await fetch("/api/cart/count");
      const countData = await countResponse.json();
      updateCartCount(countData.count);

      toast({
        title: "Úspešne pridané do košíka",
        description: `${product.name} bol pridaný do vášho košíka.`,
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

  return (
    <>
      <div className="pt-12 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-12 w-full">
        <div className="hidden md:block">
          <Image
            src={product.imagePath}
            width={300}
            height={200}
            alt="ProductImage"
          />
        </div>
        <div className="flex justify-center md:hidden">
          <Image
            src={product.imagePath}
            width={175}
            height={100}
            alt="ProductImage"
            className="flex justify-center items-center"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <h2 className="text-zinc-500">{product.authorName}</h2>
          <h2 className="text-zinc-500">{product.publisher}</h2>
          <p className="pt-4">{product.description}</p>
        </div>
        <div className="hidden md:block lg:hidden"></div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{product?.name}</CardTitle>
              <CardDescription>
                <div className="flex gap-1 items-center">
                  <Truck />
                  Doprava zadarmo
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                {product.stock && product.stock > 5 ? (
                  <>
                    <h1 className="text-green-600">{`Na sklade > 5ks`}</h1>
                  </>
                ) : (
                  <h1 className="text-green-600">{`Na sklade ${product.stock}ks`}</h1>
                )}
                <h2 className="text-4xl">{formatCurrency(product.price)}</h2>
              </div>
              {product.stock === 0 ? (
                <Button disabled className="w-full">
                  Vypredané
                </Button>
              ) : (
                <Button onClick={handleAddToCart} className="w-full">
                  Pridať do košíka
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="pt-14">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold">Ďalšie knihy</h2>
          <Button variant="outline" asChild>
            <Link href="/products" className="space-x-2">
              <span>Viac</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="pt-4">
          <ProductSwiper id={id} products={products} />
        </div>
      </div>
    </>
  );
}
