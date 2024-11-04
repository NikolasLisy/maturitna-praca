import { PageHeader } from "@/components/admin-components/PageHeader";
import { ProductUpdateForm } from "@/components/admin-components/ProductForm";

import db from "@/lib/db";

export default async function EditProduct({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id: id } });
  return (
    <>
      <PageHeader>Upravuje sa {id}</PageHeader>
      <ProductUpdateForm product={product} />
    </>
  );
}
