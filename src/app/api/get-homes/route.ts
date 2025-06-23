import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401 }
    );
  }
  const identifier = session.user?.email;
  const { prisma } = await import("@/prisma");

  // Find user by email (identifier)
  const user = await prisma.user.findUnique({ where: { email: identifier! } });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: "User not found" }),
      { status: 404 }
    );
  }

  const homes = await prisma.home.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new Response(JSON.stringify({ success: true, homes }), {
    status: 200,
  });
}