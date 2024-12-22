import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const byLowest = await db.product.findMany({
      orderBy: {
        price: "asc",
      },
    });

    if (!byLowest) {
      return NextResponse.json(
        { error: "Produkt neexistuje" },
        { status: 404 }
      );
    }

    return NextResponse.json(byLowest);
  } catch (error) {
    return NextResponse.json(
      { error: "Produkt sa nenašiel alebo aktualizácie zlyhala" },
      { status: 500 }
    );
  }
}
