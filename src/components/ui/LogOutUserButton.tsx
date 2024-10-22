"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";

const LogOutUserButton = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      className={`hidden md:flex`}
    >
      Odhlásiť sa
    </Button>
  );
};

export default LogOutUserButton;
