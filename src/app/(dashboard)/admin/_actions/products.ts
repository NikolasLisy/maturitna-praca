"use server";

import db from "@/lib/db";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const imageSchema = z
  .instanceof(File, { message: "Požadovaný typ súboru musí byť obrázok." })
  .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
    message: "Fotka produktu musí byť obrázok.",
  });

const addSchema = z.object({
  name: z.string().min(1, { message: "Názov produktu je povinný" }),
  description: z.string().min(1, { message: "Popis produktu je povinný" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Cena musí byť väčšia alebo rovná 0.01" }),
  stock: z.coerce
    .number()
    .int()
    .min(1, { message: "Počet kusov musí byť väčší alebo rovný 1" }),
  image: imageSchema.refine((file) => file.size > 0, {
    message: "Fotka produktu je povinná",
  }),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      imagePath,
      stock: data.stock,
      category: {
        create: { name: "Unidentified Category for testing purposes" },
      },
    },
  });

  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();
}
