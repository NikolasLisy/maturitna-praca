import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const productId = params.id;
  const { categoryId } = await req.json();

  if (!categoryId) {
    return NextResponse.json(
      { error: "ID Kategórie je potrebné" },
      { status: 400 }
    );
  }

  try {
    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: { categoryId },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Product sa nenašiel alebo aktualizácie zlyhala" },
      { status: 500 }
    );
  }
}
