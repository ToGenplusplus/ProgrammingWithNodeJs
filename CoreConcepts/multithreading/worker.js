const { workerData } = require("node:worker_threads");

const { port } = workerData;

port.postMessage(`Hello from worker thread: ${process.pid}`);

port.on("message", (message) => {
  console.log("Received message in worker:", message);
});
