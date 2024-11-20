"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { addBanner } from "@/app/(dashboard)/admin/_actions/products";
import { useFormState, useFormStatus } from "react-dom";

export function BannerForm() {
  const [error, action] = useFormState(addBanner, {});

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="name">
          Názov Bannera
        </Label>
        <Input type="text" id="name" name="name" required />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label className="font-bold" htmlFor="image">
          Pridajte banner
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
