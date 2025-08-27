const cpeak = require("cpeak");

const server = new cpeak();

const PORT = 8080;

// this message is sent from the master process to the worker process
// it is only available if the server is run in cluster mode
process.on("message", (msg) => {
  console.log(`Message from master: ${msg}`);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.route("get", "/", (req, res) => {
  // this message is sent from the worker process to the master process
  process.send({ action: "newRequest" });
  res.status(200).json({ message: "Hello World" });
});
