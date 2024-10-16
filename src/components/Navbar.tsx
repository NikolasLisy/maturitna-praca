import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MobileMenu from "./MobileMenu";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-24">
      <div className="lg:block">
        <Link href="/" className="font-bold text-xl text-black">
          STORELOGO
        </Link>
      </div>
      <div className="hidden md:flex">
        <div className="flex gap-6">
          <Link href="/store">Obchod</Link>
          <Link href="/contact">Kontakt</Link>
          <Link href="/newsletter">Newsletter</Link>
        </div>
      </div>
      <div className="flex items-center gap-4 xl:gap-8 justify-end">
        <MobileMenu />
        <Link href="/sign-in" className={`hidden md:flex ${buttonVariants()}`}>
          Prihlásiť sa
        </Link>
      </div>
    </nav>
  );
}
