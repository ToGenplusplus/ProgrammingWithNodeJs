const cluster = require("node:cluster");
const { pid } = require("node:process");
const os = require("node:os");

// check if the current process is the master process
if (cluster.isPrimary) {
  console.log(`Master ${pid} is running`);
  let requestCount = 0;

  setInterval(() => {
    console.log(`Master ${pid} has handled ${requestCount} requests so far`);
  }, 5000);
  // get the number of CPU cores available on the system
  // this will be the number of child processes to spawn
  const numParallerismAllowed = os.availableParallelism();
  console.log(`Number of parallel processes allowed: ${numParallerismAllowed}`);
  for (let i = 0; i < numParallerismAllowed; i++) {
    // spawn a new child process from this master process
    const worker = cluster.fork();
    console.log(
      `Maser process ${pid} spawned worker process ${worker.process.pid}`
    );
  }
  // listen for messages from the child processes
  cluster.on("message", (worker, msg) => {
    if (msg.action && msg.action === "newRequest") {
      requestCount++;
    }
  });

  // listen for the exit event of the child processes
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exited with code: ${code}, and signal: ${signal}`
    );
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log("Worker crashed, restarting...");
      // respawn the worker
      cluster.fork();
    }
  });
} else {
  // run our server code here, this will be run by each child process and each child process will have its own instance of the server.
  require("./server.js");
}
