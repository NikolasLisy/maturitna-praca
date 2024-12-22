import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const byHighest = await db.product.findMany({
      orderBy: {
        price: "desc",
      },
    });

    if (!byHighest) {
      return NextResponse.json(
        { error: "Produkt neexistuje" },
        { status: 404 }
      );
    }

    return NextResponse.json(byHighest);
  } catch (error) {
    return NextResponse.json(
      { error: "Produkt sa nenašiel alebo aktualizácie zlyhala" },
      { status: 500 }
    );
  }
}
