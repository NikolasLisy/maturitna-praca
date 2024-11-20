"use client";

import { startTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { deleteBanner } from "@/app/(dashboard)/admin/_actions/products";
import { useRouter } from "next/navigation";

export function DeleteDropDownBannerItem({ id }: { id: string }) {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(async () => {
          await deleteBanner(id);
          router.refresh();
        });
      }}
      className="text-destructive"
    >
      Delete
    </DropdownMenuItem>
  );
}
