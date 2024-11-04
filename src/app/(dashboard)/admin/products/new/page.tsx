import { PageHeader } from "@/components/admin-components/PageHeader";
import { ProductUpdateForm } from "@/components/admin-components/ProductForm";

export default function NewProductPage() {
  return (
    <>
      <PageHeader>Pridať Produkt</PageHeader>
      <ProductUpdateForm />
    </>
  );
}
