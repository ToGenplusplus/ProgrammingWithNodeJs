const net = require("node:net");
const fs = require("node:fs/promises");

//create a new TCP server
const server = net.createServer();

// listen for a new connection to server
server.on("connection", (socket) => {
  console.log("A new connection to our server has been established");

  let fileHandle;
  let fileStream;

  let drainCount = 0;
  // list for data events comming from the client through the socket
  socket.on("data", async (data) => {
    // first time receiving data, we initialize the file handle and stream
    if (!fileHandle && !fileStream) {
      console.time("File download");
      if (data.toString("utf-8").startsWith("Filename:")) {
        socket.pause(); // pause the socket to prevent data loss while we open file for downnloding
        fileHandle = await fs.open(
          `storage/${data.toString("utf-8").substring(10)}`,
          "a"
        );
        fileStream = fileHandle.createWriteStream();
        socket.resume(); // resume the socket

        // when the stream buffer is drained, resume reading from the socket
        // Set up the drain event listener once the file stream is created
        fileStream.on("drain", () => {
          drainCount++;
          socket.resume();
        });
      } else {
        console.warn(
          "Filename not received, invaild file transfer operation, closing connection"
        );
        socket.end();
      }
    } else {
      // write the data to the file stream
      // if stream buffer is full, pause reading from the socket
      if (!fileStream.write(data)) {
        socket.pause();
      }
    }
  });

  // when the client ends the connection, close the file handle
  socket.on("end", () => {
    console.timeEnd("File download");
    fileHandle?.close();
  });
});

// Start the server and listen on port 5050
server.listen(5050, "::1", () => {
  console.log("Server is listening on ", server.address());
});
