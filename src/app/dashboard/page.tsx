import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prisma } from "@/prisma";
import { SetHomeButton } from "@/components/SetHomeButton";
import { TeleportHomeButton } from "@/components/TeleportHomeButton";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/");
  } else {
    const user = session?.user!.email?.split("@")[0];
    const home = await prisma.home.findFirst({
      where: { userId: session.user!.id },
      orderBy: { createdAt: "desc" },
    });
    const [x, y, z] = [home?.location?.split(" ")[0], home?.location?.split(" ")[1], home?.location?.split(" ")[2]];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-white">Web Home</h1>
        <p className="text-lg text-gray-300">
          Teleport back to your minecraft home over this website
        </p>
        <div className="flex flex-row gap-4 mt-6">
          <TeleportHomeButton userEmail={session.user!.email!} home={home} />
          <SetHomeButton userEmail={session.user!.email!} />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant={"outline"}>More</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-bold">
                Home Info
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Length (x): {x}</DropdownMenuItem>
              <DropdownMenuItem>Hight (y): {y}</DropdownMenuItem>
              <DropdownMenuItem>Width (z): {z}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Name: {user}</DropdownMenuItem>
              <DropdownMenuItem>
                <form
                  className="p-0"
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <Button variant={"link"} className="text-red-500 p-0 m-0 h-0">
                    Sign out
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }
}
