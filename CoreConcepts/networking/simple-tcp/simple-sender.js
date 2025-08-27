const net = require("node:net");

const socket = net.createConnection({ host: "127.0.0.1", port: 4010 }, () => {
  socket.write("A simple message coming from a simple sender");
});
