const Pool = require("./pool");

const numWorkers = 4;

const pool = new Pool(numWorkers);

pool.submit(
  "generatePrimes",
  { count: 200, start: 100_000_000_000 },
  (results) => {
    console.log("Primes generated:");
    console.log(results);
  }
);
