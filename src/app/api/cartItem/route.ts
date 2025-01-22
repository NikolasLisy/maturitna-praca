import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cartProducts = await db.cartItem.findMany();
    if (!cartProducts) {
      return NextResponse.json(
        { message: "Neboli najdené žiadne produkty" },
        { status: 409 }
      );
    }
    return NextResponse.json(cartProducts);
  } catch (error) {
    return NextResponse.json(
      { message: "Neboli najdené žiadne produkty" },
      { status: 500 }
    );
  }
}
