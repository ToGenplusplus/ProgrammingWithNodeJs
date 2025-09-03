const Pool = require("./pool");

//constants
const numWorkers = 4;
const pool = new Pool(numWorkers);
const numJobsToSubmit = 2_000_000_000;
const numJobsPerBatch = 1_000;

//vars
let batchIndex = 0;
let numCompletedJobs = 0;
let jobsInBatchTracker = 0;

let allPrimes = [];

function main() {
  submitNextBatch();
}

function submitNextBatch() {
  const startIndex = batchIndex * numJobsPerBatch;
  if (startIndex < numJobsToSubmit) {
    const endIndex = Math.min(
      (batchIndex + 1) * numJobsPerBatch,
      numJobsToSubmit
    );
    submitBatch(startIndex, endIndex);
  }
}

function submitBatch(start, end) {
  for (let i = start; i < end; i++) {
    jobsInBatchTracker++;
    pool.submit(
      "generatePrimes",
      { count: 100, start: 10_000_000_000 + i * 200 },
      (results) => {
        numCompletedJobs++;

        jobsInBatchTracker--;

        allPrimes = [...allPrimes, ...results];

        if (numCompletedJobs === numJobsToSubmit) {
          console.log("All primes have been generated:");
          console.log(allPrimes);
        }

        if (jobsInBatchTracker == 0) {
          batchIndex++;
          submitNextBatch();
        }
      }
    );
  }
}

main();
// for (let i = 0; i < numTasks; i++) {
//   pool.submit(
//     "generatePrimes",
//     { count: 100, start: 10_000_000_000 + i * 200 },
//     (results) => {
//       completedJobs++;
//       allPrimes = [...allPrimes, ...results];
//       if (completedJobs === numTasks) {
//         console.log("All primes have been generated:");
//         console.log(allPrimes);
//       }
//     }
//   );
// }
