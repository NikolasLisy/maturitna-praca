"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { addCategory } from "@/app/(dashboard)/admin/_actions/products";
import { useFormState, useFormStatus } from "react-dom";

export function CategoryForm() {
  const [error, action] = useFormState(addCategory, {});

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="name">
          Názov Produktu
        </Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
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
