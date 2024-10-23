import NotLoggedIn from "@/components/admin-components/NotLoggedIn";
import WithAdminRights from "@/components/admin-components/WithAdminRights";
import WithoutAdminRights from "@/components/admin-components/WithoutAdminRights";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
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
      <>{isAdmin === true ? <WithAdminRights /> : <WithoutAdminRights />}</>
    );
  }

  return <NotLoggedIn />;
};

export default page;
