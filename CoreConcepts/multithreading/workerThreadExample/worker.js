const { parentPort } = require("node:worker_threads");

// function to simultae a CPU intensive task such as summing up number from 1 to 1 billion
let sum = 0;
for (let i = 1; i <= 1e12; i++) {
  sum += i;
}

const message = `Sum from 1 to 1 trillion is: ${sum}`;
parentPort.postMessage(message);
// Notify the main thread that the worker has completed its task
// the destination thread will receive a copy of the data
// v8 converts the data to binary format before sending it and the receiving thread will convert it back to JavaScript object
