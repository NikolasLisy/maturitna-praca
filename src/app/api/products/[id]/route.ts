import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produkt neexistuje" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Produkt sa nenašiel alebo aktualizácie zlyhala" },
      { status: 500 }
    );
  }
}
