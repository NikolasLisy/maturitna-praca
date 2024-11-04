import { CategoryForm } from "@/components/admin-components/CategoryForm";
import { PageHeader } from "@/components/admin-components/PageHeader";

export default function NewCategoryPage() {
  return (
    <>
      <PageHeader>Pridať Kategóriu</PageHeader>
      <CategoryForm />
    </>
  );
}
