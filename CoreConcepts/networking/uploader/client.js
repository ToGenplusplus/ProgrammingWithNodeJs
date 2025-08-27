const net = require("node:net");
const fs = require("node:fs/promises");
const { argv } = require("node:process");
const path = require("node:path");

// Create a connection to the server on port 5050 at the address "::1" (IPv6 localhost)
const clientSocket = net.createConnection(5050, "::1", async () => {
  const fp = argv[2];
  const fileName = path.basename(fp);
  const fileHandle = await fs.open(fp, "r"); // Open the file for reading

  const fileStream = fileHandle.createReadStream(); // Create a readable stream from the file handle

  const fileSize = (await fileHandle.stat()).size;

  let uploadPercentage = 0;
  let bytesUploaded = 0;

  clientSocket.write(Buffer.from("Filename: " + fileName)); // Write the filename to the server

  console.log(""); // empty console line for preetier outputing of the upload status

  // When data is read from the file stream, write it to the client socket
  fileStream.on("data", (data) => {
    if (!clientSocket.write(data)) {
      // If the socket buffer is full, pause the file stream
      fileStream.pause();
    }

    bytesUploaded += data.length;
    const newPercentage = Math.floor((bytesUploaded / fileSize) * 100);
    if (newPercentage > uploadPercentage) {
      uploadPercentage = newPercentage;
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine();
      console.log(`Upload progress: ${uploadPercentage}%`);
    }
  });

  // When the socket buffer is drained, resume the file stream
  clientSocket.on("drain", () => {
    fileStream.resume();
  });

  // When the file stream ends (all data has been read), log a message and close the file handle
  fileStream.on("end", () => {
    console.log("File has been uploaded");
    fileHandle.close();
  });

  // When the file stream is closed, end the client socket connection
  fileStream.on("close", () => {
    clientSocket.end();
  });

  // Handle socket error
  clientSocket.on("error", (err) => {
    console.error("Socket error:", err);
  });
});
