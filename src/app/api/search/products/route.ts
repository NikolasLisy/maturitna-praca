import { NextResponse } from "next/server";
import db from "@/lib/db";
import { QrCode } from "lucide-react";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  if (req.method === "GET") {
    try {
      const q = searchParams.get("q");

      if (typeof q !== "string") {
        throw new Error("Neznáma požiadavka");
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
      });

      return NextResponse.json({
        products,
      });
    } catch (error) {
      return NextResponse.json({ error: "chyba" }, { status: 500 });
    }
  }
}
