//This file will contain the code (CPU Intensive work) to run in a worker thread
const { workerData, parentPort } = require("node:worker_threads");
const generatePrimes = require("../lib/prime-generator");

// we need a way to get the count and the starting number from the parent thread
const { count, start } = workerData;

// parentPort.postMessage(
//   `Generating ${count} prime numbers starting from ${startNumber}...`
// );

const primes = generatePrimes(count, start, { format: true });

//once the work is complete, we need a way to send the results back to the parent thread
parentPort.postMessage(primes);
