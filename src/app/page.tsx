import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div>
          <h1 className="">Home</h1>
          <Link className={buttonVariants()} href="/admin">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
