import { sendCommand } from "@/lib/rcon";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401 }
    );
  }
  const { identifier } = await request.json();
  const username = identifier.split("@")[0];
  const { prisma } = await import("@/prisma");

  // Find user by email (identifier)
  const user = await prisma.user.findUnique({ where: { email: identifier } });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: "User not found" }),
      { status: 404 }
    );
  }

  // Get the latest home coordinates
  const home = await prisma.home.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  console.log(home);
  if (!home) {
    return new Response(
      JSON.stringify({ success: false, error: "No home location found" }),
      { status: 404 }
    );
  } else {
    const cords = home.location;
    await sendCommand(`tp ${username} ${cords}`);
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
