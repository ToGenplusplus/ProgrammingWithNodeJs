const net = require("node:net");

// create a new TCP
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});

server.listen(4010, "127.0.0.1", () => {
  console.log("Server is listening on:", server.address());
});
