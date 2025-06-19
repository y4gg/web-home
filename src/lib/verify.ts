import { PrismaClient } from "../generated/prisma";
import { sendCommand } from "./rcon";

const otp = Array.from({ length: 6 }, () =>
  Math.floor(Math.random() * 10)
).join("");

export function sendCode(user: string) {
  sendCommand(`tellraw ${user} {"text":"Code: ${otp}"}`);
}