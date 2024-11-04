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

const editSchema = addSchema.extend({
  image: imageSchema.optional(),
});

const categoryAddSchema = z.object({
  name: z.string().min(1, { message: "Názov kategórie je povinný" }),
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
        connect: { id: "d63f5d14-a242-4411-b507-3364dfee7a23" },
      },
    },
  });

  redirect("/admin/products");
}

export async function addCategory(prevState: unknown, formData: FormData) {
  const result = categoryAddSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.category.create({
    data: {
      name: data.name,
    },
  });

  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      imagePath,
      stock: data.stock,
    },
  });

  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({ where: { id } });
  if (product == null) return notFound();

  await fs.unlink(`public${product.imagePath}`);
}
