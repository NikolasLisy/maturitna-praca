"use client";

import Link from "next/link";
import React, { FC, useState } from "react";
import { buttonVariants } from "./ui/button";
import LogOutUserButtonMobile from "./ui/LogOutUserButtonMobile";

interface MobileMenuProps {
  isAdmin: boolean;
  session: any;
}

const MobileMenu: FC<MobileMenuProps> = ({ isAdmin, session }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Zatvorí menu
  };

  return (
    <div className="md:hidden">
      <div
        className="flex flex-col gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-black rounded-sm ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-black rounded-sm ${
            isOpen ? "opacity-0" : ""
          } ease-in-out duration-500`}
        />
        <div
          className={`w-6 h-1 bg-black rounded-sm ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          {session?.user ? (
            <LogOutUserButtonMobile />
          ) : (
            <Link
              href="/sign-in"
              className={`${buttonVariants()}`}
              onClick={handleLinkClick}
            >
              Prihlásiť sa
            </Link>
          )}
          <Link href="/" onClick={handleLinkClick}>
            Domov
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Kontakt
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Newsletter
          </Link>
          <Link href="/" onClick={handleLinkClick}>
            Košík
          </Link>
          {isAdmin && (
            <Link href="/admin" onClick={handleLinkClick}>
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
