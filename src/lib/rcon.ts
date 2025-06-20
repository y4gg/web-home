"use server";
// @ts-expect-error: No type definitions for 'rcon' package
import Rcon from "rcon";

const host = process.env.RCON_HOST;
const port = process.env.RCON_PORT;
const psw = process.env.RCON_PASSWORD;

const rcon = new Rcon(host, port, psw);

export async function sendCommand(command: string) {
  const response = new Promise((resolve, reject) => {
    rcon.connect();
    rcon.on("auth", () => {
      console.log("Authenticated.");
      rcon.send(command);
      rcon.on("response", (str: string) => {
        console.log("Server response:", str);
        rcon.disconnect();
        resolve(str);
      });
    });
    rcon.on("error", (err: string) => {
      rcon.disconnect();
      console.error("Error:", err);
      reject(err);
    });
  });
  return response;
}

rcon.on("end", () => {
  console.log("Connection closed.");
});