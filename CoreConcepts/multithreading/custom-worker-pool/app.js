const Pool = require("./pool");

const numWorkers = 4;

const pool = new Pool(numWorkers);

const numTasks = 100;

let allPrimes = [];

for (let i = 0; i < numTasks; i++) {
  pool.submit(
    "generatePrimes",
    { count: 200, start: 100_000_000_000 + i * 200 },
    (results) => {
      allPrimes = [...allPrimes, ...results];
    }
  );
}
