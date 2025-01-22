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

    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produkt sa nenašiel" },
        { status: 404 }
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

    const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

    if (currentQuantity >= product.stock) {
      return NextResponse.json(
        {
          message: `Nie je možné pridať viac položiek. Dostupné množstvo na sklade: ${product.stock}.`,
        },
        { status: 400 }
      );
    }

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
      { message: "Produkt bol úspešne pridaný do košíka" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Interná chyba servera" },
      { status: 500 }
    );
  }
}
