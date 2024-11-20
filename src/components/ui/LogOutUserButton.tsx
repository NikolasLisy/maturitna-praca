"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";
import { LogOut } from "lucide-react";

const LogOutUserButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className={`flex w-full gap-1`}
    >
      <LogOut />
      Odhlásiť sa
    </Button>
  );
};

export default LogOutUserButton;
