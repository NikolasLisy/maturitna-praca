import { CarouselImage } from "@/components/client-components/Carouselmage";
import { ProductCard } from "@/components/client-components/ProductCard";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function getMostPopularProducts() {
  const bestSellingProducts = await db.orderItem.groupBy({
    by: ["productId"],
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: "desc" } },
    take: 10,
  });

  const productIds = bestSellingProducts.map((item) => item.productId);

  return db.product.findMany({
    where: { id: { in: productIds } },
  });
}

function getNewestProducts() {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const slides = await db.banner.findMany();

  return (
    <main className="space-y-12">
      <div className="-mx-4 md:-mx-8 lg:-mx-16 xl:-mx-32 2xl:-mx-64">
        <CarouselImage slides={slides} />
      </div>
      <ProductGridSection
        productsFetcher={getNewestProducts}
        title="Najnovšie"
      />
      <ProductGridSection
        productsFetcher={getMostPopularProducts}
        title="Najpopularnejšie"
      />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

async function ProductGridSection({
  title,
  productsFetcher,
}: ProductGridSectionProps) {
  const products = await productsFetcher(); // Zavolanie funkcie, ktorá získava produkty

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>Viac</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
