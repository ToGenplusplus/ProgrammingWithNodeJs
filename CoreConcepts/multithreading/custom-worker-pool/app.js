const Pool = require("./pool");

const numWorkers = 4;

const pool = new Pool(numWorkers);

const numTasks = 100;

let completedJobs = 0;

let allPrimes = [];

for (let i = 0; i < numTasks; i++) {
  pool.submit(
    "generatePrimes",
    { count: 100, start: 1_000_000_000_000 + i * 200 },
    (results) => {
      completedJobs++;
      allPrimes = [...allPrimes, ...results];
      if (completedJobs === numTasks) {
        console.log("All primes have been generated:");
        console.log(allPrimes);
      }
    }
  );
}
