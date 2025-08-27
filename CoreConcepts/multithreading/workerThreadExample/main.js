const { Worker } = require("node:worker_threads");

function runWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js");

    worker.on("message", (message) => {
      console.log("Message from worker:", message);
      resolve(message);
    });

    worker.on("error", (error) => {
      console.error("Error from worker:", error);
      reject(error);
    });
  });
}

async function main() {
  console.log("Starting main thread...");
  const result = await runWorker();
  console.log("Worker completed with result:", result);
}

main();
