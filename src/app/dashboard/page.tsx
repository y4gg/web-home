import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { HomeTable } from "@/components/HomeTable";
import { More } from "@/components/More";
import { CreateHome } from "@/components/CreateHome";

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
      take: 3,
    });
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white">Web Home</h1>
        <p className="text-lg text-gray-300 max-w-80 md:max-w-none">
          Teleport back to your minecraft home over this website
        </p>
        <div className="flex flex-row gap-4 mt-6">
          <CreateHome userEmail={email ?? ""} />
          <More user={user ?? ""} />
        </div>
        <HomeTable homes={homes} userEmail={email ?? ""} />
      </div>
    );
  }
}
