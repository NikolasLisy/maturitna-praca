"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import { Toast } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";

export function CategorySelector({ productId }: { productId: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);

    try {
      const response = await fetch(`/api/products/${productId}/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId }),
      });

      if (!response.ok) {
        toast({
          title: "Chyba!",
          description: "Nepodarila sa aktualizovať kategória.",
          variant: "destructive",
        });
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Vyberte kategóriu" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
