import { CarouselSwiper } from "@/components/client-components/CarouselImageUsingSwiper";
import { ProductSwiper } from "@/components/client-components/ProductSwiper";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
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
  const slides = await db.banner.findMany();

  return (
    <main className="space-y-12">
      <div>
        <CarouselSwiper slides={slides} />
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
  const products = await productsFetcher();
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
      <div>
        <ProductSwiper id={""} products={products} />
      </div>
    </div>
  );
}
