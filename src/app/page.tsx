import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div>
          <h1 className="">Home</h1>
          <Link className={buttonVariants()} href="/admin">
            Admin Dashboard
          </Link>
          <h2>{JSON.stringify(session)}</h2>
        </div>
      </div>
    </>
  );
}
