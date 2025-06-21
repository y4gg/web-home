import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { DashboardClient } from "./DashboardClient";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/");
  } else {
    const email = session?.user!.email;
    const user = session?.user!.email?.split("@")[0];
    const homes = await prisma.home.findMany({
      where: { userId: session.user!.id },
      orderBy: { createdAt: "desc" },
    });
    const maxHomes = await prisma.user.findUnique({
      where: { id: session.user!.id },
      select: { maxHomes: true },
    });
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white">Web Home</h1>
        <p className="text-lg text-gray-300 max-w-80 md:max-w-none">
          Teleport back to your minecraft home over this website
        </p>
        <DashboardClient
          initialHomes={homes}
          userEmail={email ?? ""}
          user={user ?? ""}
          maxHomes={maxHomes?.maxHomes ?? 3}
        />
      </div>
    );
  }
}
