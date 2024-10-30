import AdminNavbar from "@/components/admin-components/AdminNavbar";
import WithoutAdminRights from "@/components/admin-components/WithoutAdminRights";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <div>
      {isAdmin === true ? (
        <div>
          <AdminNavbar />
          <div className="pt-[60px]">{children}</div>
        </div>
      ) : (
        <WithoutAdminRights />
      )}
    </div>
  );
}
