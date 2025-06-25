import { sendCommand } from "@/lib/rcon";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401 }
    );
  }
  const identifier = session.user?.email;
  const { homeName } = await request.json();
  if (homeName === "") {
    return new Response(
      JSON.stringify({ success: false, error: "Home name is required" }),
      { status: 400 }
    );
  }
  if (homeName.length > 24) {
    return new Response(
      JSON.stringify({ success: false, error: "Home name is too long" }),
      { status: 400 }
    );
  }
  const username = identifier?.split("@")[0];
  const dimensionResponse = await sendCommand(
    `/data get entity ${username} Dimension`
  );
  if (dimensionResponse === "No entity was found")
    return new Response(
      JSON.stringify({ success: false, server_response: dimensionResponse }),
      { status: 404 }
    );
  // Extract dimension value from response, e.g. "minecraft:the_nether"
  const dimensionMatch = String(dimensionResponse).match(/: "([^"]+)"/);
  const dimension = dimensionMatch ? dimensionMatch[1] : null;

  const response = await sendCommand(`/data get entity ${username} Pos`);

  // Ensure response is a string
  const responseStr = String(response);
  // Parse coordinates from response string
  // Example: '[Steve] has the following entity data: [123.45d, 64.00d, -321.67d]'
  const match = responseStr.match(/\[([-\d.]+)d, ([-\d.]+)d, ([-\d.]+)d\]/);
  if (!match) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Could not parse coordinates",
        server_response: response,
      }),
      { status: 400 }
    );
  }
  const [x, y, z] = [match[1], match[2], match[3]];
  // Limit to two decimal places
  const [x2, y2, z2] = [
    parseFloat(x).toFixed(2),
    parseFloat(y).toFixed(2),
    parseFloat(z).toFixed(2),
  ];

  // Find user by email (identifier)
  const user = await prisma.user.findUnique({
    where: { email: identifier! },
    include: { home: true },
  });
  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: "User not found" }),
      { status: 404 }
    );
  }
  if (user.maxHomes <= user.home.length) {
    return new Response(
      JSON.stringify({ success: false, error: "You have reached the maximum number of homes" }),
      { status: 400 }
    );
  }

  // Save coordinates as a new Home
  const home = await prisma.home.create({
    data: {
      location: `${x2} ${y2} ${z2}`,
      dimension: dimension ?? "",
      userId: user.id,
      name: homeName,
    },
  });

  return new Response(
    JSON.stringify({ success: true, server_response: responseStr, home }),
    { status: 200 }
  );
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
