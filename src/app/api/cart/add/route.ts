import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Neprihlásený" }, { status: 401 });
  }

  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json({ message: "Chýba ID produktu" }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email: session.user.email },
      include: { cart: { include: { items: true } } },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Používateľ sa nenašiel" },
        { status: 401 }
      );
    }

    const cart = await db.cart.upsert({
      where: { userId: user.id },
      create: { userId: user.id },
      update: {},
    });

    const existingCartItem = await db.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingCartItem) {
      await db.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
    } else {
      await db.cartItem.create({
        data: { cartId: cart.id, productId, quantity: 1 },
      });
    }

    return NextResponse.json(
      { message: "Product added to cart" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { messag: "Interná chyba servera" },
      { status: 500 }
    );
  }
}
