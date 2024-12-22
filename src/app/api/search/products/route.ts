import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q") || "";
    const order = searchParams.get("order") || "asc";

    if (order !== "asc" && order !== "desc") {
      return NextResponse.json(
        { error: "Neplatná hodnota parametra 'order'" },
        { status: 400 }
      );
    }

    const products = await db.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            authorName: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            publisher: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        price: order,
      },
    });

    return NextResponse.json({
      products,
    });
  } catch (error) {
    console.error("Chyba pri načítaní produktov:", error);
    return NextResponse.json(
      { error: "Nastala chyba na serveri" },
      { status: 500 }
    );
  }
}
