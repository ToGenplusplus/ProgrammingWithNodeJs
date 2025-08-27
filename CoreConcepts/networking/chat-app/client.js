const net = require("node:net");
const readLine = require("node:readline/promises");

const HOST = "127.0.0.1";
const PORT = 4020;

let clientId;
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = async (direction) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(direction, resolve);
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, resolve);
  });
};

const ask = async () => {
  const message = await rl.question("Enter message>");
  await moveCursor(0, -1);
  await clearLine(0);
  client.write(`${clientId}>${message}`);
};

const client = net.createConnection(PORT, HOST, async () => {
  console.log("Connected to server");
  ask();
});

client.on("data", async (data) => {
  console.log("");
  await moveCursor(0, -1);
  await clearLine(0);
  if (data.toString("utf-8").substring(0, 2) === "id") {
    clientId = data.toString("utf-8").substring(3);
    console.log(`Your id is ${clientId}!\n`);
  } else {
    console.log(data.toString("utf-8"));
  }
  ask();
});

client.on("end", () => {
  console.log("Connection was ended");
});
