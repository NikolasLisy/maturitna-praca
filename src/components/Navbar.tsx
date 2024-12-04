import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import MobileMenu from "./MobileMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogOutUserButton from "./ui/LogOutUserButton";
import db from "@/lib/db";
import {
  BookOpenText,
  CircleUserRound,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
  UserRoundCog,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Searchbar } from "./Searchbar";
import { SearchbarLargeScreen } from "./SearchbarLargeScreen";

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
    <>
      <nav className="flex items-center justify-between h-24">
        <div className="lg:block">
          <div className="flex">
            <BookOpenText />
            <Link href="/" className="font-bold text-xl pl-1 text-black">
              LITERA.sk
            </Link>
          </div>
        </div>
        <div className="hidden md:flex ">
          <div className="flex gap-6 items-center">
            <Link href="/products">Knihy</Link>
            <Link href="/contact">Kontakt</Link>
            <Link href="/newsletter">Newsletter</Link>
            <SearchbarLargeScreen />
          </div>
        </div>
        <div className="flex items-center gap-4 xl:gap-8 justify-end">
          <MobileMenu isAdmin={isAdmin} session={session} />
          {session?.user ? (
            <>
              <Button className="relative">
                <ShoppingCart />
                <div className="rounded bg-red-500 pl-2 pr-2 absolute -bottom-1 -right-2">
                  3
                </div>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CircleUserRound className="cursor-pointer w-8 h-8" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Môj účet</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      {currentUser && (
                        <Link
                          className="w-full"
                          href={`/profile/${currentUser.id}`}
                        >
                          Profil
                        </Link>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings />
                      {currentUser && (
                        <Link
                          className="w-full"
                          href={`/profile/${currentUser.id}/settings`}
                        >
                          Nastavenia
                        </Link>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Package />
                      {currentUser && (
                        <Link
                          className="w-full"
                          href={`/profile/${currentUser.id}/orders`}
                        >
                          Objednávky
                        </Link>
                      )}
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem>
                        <UserRoundCog />
                        <Link className="w-full" href={`/admin`}>
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOutUserButton />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // <LogOutUserButton />

            <Link
              href="/sign-in"
              className={`hidden md:flex ${buttonVariants()}`}
            >
              Prihlásiť sa
            </Link>
          )}
        </div>
      </nav>
      <Searchbar />
    </>
  );
}
