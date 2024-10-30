"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { addProduct } from "@/app/(dashboard)/admin/_actions/products";
import { useFormState, useFormStatus } from "react-dom";

export function ProductForm() {
  const [error, action] = useFormState(addProduct, {});
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number | undefined>(undefined);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="name">
          Názov Produktu
        </Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="price">
          Cena Produktu
        </Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={price ?? ""}
          onChange={(e) =>
            setPrice(e.target.value ? Number(e.target.value) : undefined)
          }
          required
        />
        <div className="text-muted-foreground">
          {formatCurrency(price || 0)}
        </div>
        {error.price && <div className="text-destructive">{error.price}</div>}
      </div>
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="description">
          Popis Produktu
        </Label>
        <Textarea id="description" name="description" required />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="stock">
          Počet Kusov
        </Label>
        <Input
          type="number"
          id="stock"
          name="stock"
          value={stock ?? ""}
          onChange={(e) =>
            setStock(e.target.value ? Number(e.target.value) : undefined)
          }
          required
        />
        {error.stock && <div className="text-destructive">{error.stock}</div>}
      </div>
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="image">
          Fotka Produktu
        </Label>
        <Input type="file" id="image" name="image" required />
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Ukladanie..." : "Uložiť"}
    </Button>
  );
}
