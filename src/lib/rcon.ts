"use server";
// @ts-expect-error: No type definitions for 'rcon' package
import Rcon from "rcon";

const host = process.env.RCON_HOST;
const port = process.env.RCON_PORT;
const psw = process.env.RCON_PASSWORD;

const rcon = new Rcon(host, port, psw);

rcon.on("auth", () => {
  console.log("Authenticated.");
});

rcon.on("end", () => {
  console.log("Connection closed.");
});

export async function sendCommand(command: string) {
  const response = new Promise((resolve, reject) => {
    rcon.connect();
    rcon.once("auth", () => {
      rcon.send(command);
      rcon.once("response", (data: string) => {
        console.log(data);
        rcon.disconnect();
        resolve(data);
      });
      rcon.once("error", (err: string) => {
        console.error(err);
        rcon.disconnect();
        reject(err);
      });
    });
  });
  return response;
}
