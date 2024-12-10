import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
  try {
    const products = await db.product.findMany();
    if (!products) {
      return NextResponse.json(
        { error: "Produkt neexistuje" },
        { status: 404 }
      );
    }
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Produkt sa nenašiel alebo aktualizácie zlyhala" },
      { status: 500 }
    );
  }
}
