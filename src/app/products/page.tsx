import { ProductCard } from "@/components/client-components/ProductCard";
import db from "@/lib/db";

function getProducts() {
  return db.product.findMany();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
