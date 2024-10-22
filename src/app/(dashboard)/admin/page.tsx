import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { OctagonX } from "lucide-react";
import { getServerSession } from "next-auth";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);
  let isAdmin = false;

  if (session?.user.email) {
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (currentUser?.isAdmin) {
      isAdmin = true;
    }
  }

  if (session?.user) {
    return (
      <>
        {isAdmin === true ? (
          <h2>Vítajte {session?.user.name}</h2>
        ) : (
          <div className="flex min-h-screen items-center justify-center text-center flex-col">
            <OctagonX className="w-52 h-52 text-red-500 mb-8" />
            <h2 className="text-4xl font-semibold">Nie ste administrátor</h2>
            <p className="text-2xl items-center">
              Nemáte dostatočné práva aby ste videli obsah tejto stránky.
            </p>
            <p className="text-l text-slate-500">
              {`(Ak je toto chyba kontaktuje majiteľa stránky)`}
            </p>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center text-center flex-col">
      <OctagonX className="w-52 h-52 text-red-500 mb-8" />
      <h2 className="text-4xl font-semibold">
        Prosím prihláste sa aby ste videli obsah stránky!
      </h2>
    </div>
  );
};

export default page;
