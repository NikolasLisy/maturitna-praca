import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import MobileMenu from "./MobileMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogOutUserButton from "./ui/LogOutUserButton";
import db from "@/lib/db";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  let isAdmin = false;
  let currentUser = null;

  if (session?.user.email) {
    currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (currentUser?.isAdmin) {
      isAdmin = true;
    }
  }

  return (
    <nav className="flex items-center justify-between h-24">
      <div className="lg:block">
        <Link href="/" className="font-bold text-xl text-black">
          STORELOGO
        </Link>
      </div>
      <div className="hidden md:flex">
        <div className="flex gap-6">
          {isAdmin && <Link href="/admin">Admin Dashboard</Link>}
          <Link href="/store">Obchod</Link>
          <Link href="/contact">Kontakt</Link>
          <Link href="/newsletter">Newsletter</Link>
          {currentUser && (
            <Link href={`/profile/${currentUser.id}`}>Profil</Link>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 xl:gap-8 justify-end">
        <MobileMenu isAdmin={isAdmin} session={session} />
        {session?.user ? (
          <LogOutUserButton />
        ) : (
          <Link
            href="/sign-in"
            className={`hidden md:flex ${buttonVariants()}`}
          >
            Prihlásiť sa
          </Link>
        )}
      </div>
    </nav>
  );
}
