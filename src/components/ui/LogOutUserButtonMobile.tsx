"use client";

import { signOut } from "next-auth/react";
import { Button } from "./button";

const LogOutUserButtonMobile = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Odhlásiť sa
    </Button>
  );
};

export default LogOutUserButtonMobile;
