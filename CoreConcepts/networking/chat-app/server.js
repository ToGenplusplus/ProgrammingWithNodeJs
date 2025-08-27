const net = require("node:net");

const HOST = "127.0.0.1";
const PORT = 4020;
const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
  console.log(`new connection ${socket.remoteAddress}:${socket.remotePort}`);
  const clientId = clients.length + 1;

  const welcomeMessage = `User ${clientId}: has joined the chat`;
  socket.write(`id>${clientId}`);
  clients.map((client) => client.socket.write(welcomeMessage));
  clients.push({ id: clientId.toString(), socket });

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const seperatorIndex = dataString.indexOf(">");
    const id = dataString.substring(0, seperatorIndex);
    const message = dataString.substring(seperatorIndex + 1);
    clients.map((client) => client.socket.write(`User: ${id} > ${message}`));
  });

  socket.on("end", () => {
    clients.map((client) => client.socket.write(`User: ${clientId} left!`));
  });
});

server.listen(PORT, HOST, () => {
  console.log("opened server on:", server.address());
});
