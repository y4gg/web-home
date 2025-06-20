"use server";
// @ts-expect-error: No type definitions for 'rcon' package
import Rcon from "rcon";

const host = process.env.RCON_HOST;
const port = process.env.RCON_PORT;
const psw = process.env.RCON_PASSWORD;

const rcon = new Rcon(host, port, psw);

let isConnected = false;

rcon.on("auth", () => {
  isConnected = true;
  console.log("Authenticated.");
});

rcon.on("end", () => {
  isConnected = false;
  console.log("Connection closed.");
});

rcon.on("error", (err: string) => {
  isConnected = false;
  console.error("RCON error:", err);
});

// Connect once at startup
rcon.connect();

export async function sendCommand(command: string) {
  if (!isConnected) {
    throw new Error("RCON not connected");
    console.log("Attempting to connect...");
    await rcon.connect();
  }
  return new Promise((resolve, reject) => {
    rcon.once("response", (str: string) => {
      console.log("Server response:", str);
      resolve(str);
    });
    rcon.once("error", (err: string) => {
      console.error("Error:", err);
      reject(err);
    });
    rcon.send(command);
  });
}
