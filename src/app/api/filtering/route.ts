import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const order = searchParams.get("order");

  try {
    const products = await db.product.findMany({
      orderBy: {
        price: order === "desc" ? "desc" : "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Chyba pri načítavaní produktov. " },
      { status: 500 }
    );
  }
}
