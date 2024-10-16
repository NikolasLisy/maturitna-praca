import db from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Meno je povinné"),
  surname: z.string().min(1, "Priezvisko je povinné."),
  email: z.string().min(1, "Email je povinný.").email("Neplatný email"),
  password: z.string().min(1, "Heslo je povinné"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Používateľ s týmto mailom už existuje",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      {
        user: rest,
        message: "Registrácia bola úspešná.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Niečo sa pokazilo!" },
      { status: 500 }
    );
  }
}
