const net = require("node:net");

const socket = net.createConnection({ host: "localhost", port: 8080 }, () => {
  const head = Buffer.from(
    "504f5354202f20485454502f312e310d0a436f6e74656e742d547970653a206170706c69636174696f6e2f6a736f6e0d0a486f73743a206c6f63616c686f73743a383038300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2034390d0a0d0a",
    "hex"
  );

  const body = Buffer.from(
    "7b226d657373616765223a225468697320697320676f696e6720746f206265206d79206c617374206d657373616765227d",
    "hex"
  );

  socket.write(Buffer.concat([head, body]));
});

socket.on("data", (data) => {
  console.log("Data recieved from server:");
  console.log(data.toString("utf-8"));
});

// socket.end();

socket.on("end", () => {
  console.log("Connection closed by the server");
});
