import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== params.id) {
    redirect("/unathorized");
  }

  return <h1>{params.id}</h1>;
}
