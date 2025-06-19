import { sendCommand } from "@/lib/rcon";

export async function POST(request: Request) {
  const { identifier, url } = await request.json();
  const username = identifier.split("@")[0];
  await sendCommand(
    `tellraw ${username} {"text":"Click here to sign into web home.","color":"green","bold":true,"underlined":true,"clickEvent":{"action":"open_url","value":"${url}"}}`
  );
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
} 