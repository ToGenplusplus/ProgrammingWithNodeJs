const { Worker, MessageChannel } = require("node:worker_threads");

/* Example 1
const a = 10;
// spinning up a new worker thread
// arguments is a string containing path to a javaScript file to be executed in the worker thread
// const worker = new Worker("./calc.js");
// const worker1 = new Worker("./calc.js");

for (let i = 0; i < 4; i++) {
  const work = new Worker("./calc.js");
}

console.log(a);
while (true);
// setTimeout(() => {
//   const worker2 = new Worker("./calc.js");
// }, 5000);
*/

/*
Example 2: Message channel

const channel = new MessageChannel();
// two import ports are created
const { port1, port2 } = channel;

port1.postMessage("Hello from port1");

port1.on("message", (message) => {
  console.log("Received message on port1:", message);
});

port2.on("message", (message) => {
  console.log("Received message on port2:", message);
});

*/

/*

Example 3: Establishing communication between two worker threads using MessageChannel

const { port1, port2 } = new MessageChannel();

const thread1 = new Worker("./worker.js", {
  workerData: { port: port1 },
  transferList: [port1],
});

const thread2 = new Worker("./worker.js", {
  workerData: { port: port2 },
  transferList: [port2],
});

*/

// Example 4: Communication between main thread and 2 worker threads using MessageChannel

const channel1 = new MessageChannel();
const channel2 = new MessageChannel();

const worker1 = new Worker("./worker.js", {
  workerData: { port: channel1.port1 },
  transferList: [channel1.port1],
});

channel1.port2.on("message", (message) => {
  console.log("Received message from worker1:", message);
});

const worker2 = new Worker("./worker.js", {
  workerData: { port: channel2.port1 },
  transferList: [channel2.port1],
});

channel2.port2.on("message", (message) => {
  console.log("Received message from worker2:", message);
});
