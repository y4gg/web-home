"use server";

const Rcon = require("rcon");

const host = process.env.RCON_HOST;
const port = process.env.RCON_PORT;
const psw = process.env.RCON_PASSWORD;

const rcon = new Rcon(host, port, psw);

export async function sendCommand(command: string) {
  console.log("Sending command:", command);
  rcon.send(command);
}

rcon.on("auth", () => {
  console.log("Authenticated.");
});

rcon.on("response", (str: string) => {
  console.log("Server response:", str);
  rcon.disconnect();
});

rcon.on("end", () => {
  console.log("Connection closed.");
});

rcon.on("error", (err: string) => {
  console.error("Error:", err);
});

rcon.connect();
