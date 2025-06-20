import { sendCommand } from "@/lib/rcon";

export async function POST(request: Request) {
  const { identifier, url, secret } = await request.json();
  if (secret !== process.env.AUTH_SECRET) {
    return new Response(JSON.stringify({ success: false, error: "Invalid secret" }), { status: 401 });
  }
  const username = identifier.split("@")[0];
  await sendCommand(
    `tellraw ${username} {"text":"Click here to sign into web home.","color":"green","bold":true,"underlined":true,"clickEvent":{"action":"open_url","value":"${url}"}}`
  );
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
} 