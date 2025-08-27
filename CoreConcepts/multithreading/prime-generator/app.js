const readlinePromises = require("readline/promises");
const { Worker } = require("node:worker_threads");
const { performance } = require("node:perf_hooks");

const main = async () => {
  console.log("Welcome to the prime-generator application!");

  let count = 50;
  let startNumber = 100_000_000_000_000;

  let workersCompleted = 0;
  let primesGenerated = [];

  const numThreads = 2;

  const start = performance.now();

  for (let i = 0; i < numThreads; i++) {
    const w = new Worker("./worker.js", {
      workerData: {
        count: count / numThreads,
        startNumber: startNumber + i * 50,
      },
    });

    const wThread = w.threadId;
    console.log(`Worker ${wThread} started`);

    w.on("message", (primes) => {
      primesGenerated = [...primesGenerated, ...primes];
    });

    w.on("error", (err) => {
      console.error(`Worker ${wThread} encoutered an error..`, err);
    });

    w.on("exit", (code) => {
      workersCompleted++;

      if (code !== 0) {
        console.log(
          `Worker ${wThread} finished with a non 0 exit code: ${code}`
        );
      } else {
        console.log(`Worker ${wThread} exited successfully`);
      }

      if (workersCompleted === numThreads) {
        console.log(
          `Completed. It took ${
            performance.now() - start
          }ms to generate ${count} primes from ${startNumber}:`
        );
        console.log(primesGenerated);
      }
    });
  }

  // Create a readline interface
  // const rl = readlinePromises.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });

  // for (let i = 0; i < 2; i++) {

  // }

  // await getAndValidateInput(rl);
};

//TODO complete this
const getAndValidateInput = async (rl) => {
  /**
   * Ask the user to enter the number of primes to generate between 1 and 1000000
   * verify the user input
   * Ask the user to generate a starting number
   * verify the user input
   */
  const count = await rl.question(
    "How many prime numbers will you like to generate (between 1 and 1000000)?"
  );

  await rl.moveCursor(0, 1);

  const startNumber = await rl.question(
    `What number would you like as the starting point for generating ${count} primes?`
  );

  rl.close();
};

// const start = performance.now();
// console.log(
//   `It took ${
//     performance.now() - start
//   }ms to generate the following prime numbers:`
// );

// console.log(primes);
main();
