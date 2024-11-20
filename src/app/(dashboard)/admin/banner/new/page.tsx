import { BannerForm } from "@/components/admin-components/BannerForm";
import { PageHeader } from "@/components/admin-components/PageHeader";

export default function NewBannerPage() {
  return (
    <>
      <PageHeader>Pridať Banner</PageHeader>
      <BannerForm />
    </>
  );
}
