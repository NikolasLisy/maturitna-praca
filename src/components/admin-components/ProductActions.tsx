"use client";

import { startTransition } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { deleteProduct } from "@/app/(dashboard)/admin/_actions/products";
import { useRouter } from "next/navigation";

export function DeleteDropDownItem({ id }: { id: string }) {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
      className="text-destructive"
    >
      Delete
    </DropdownMenuItem>
  );
}
