const { performance } = require("node:perf_hooks");
const { Worker } = require("node:worker_threads");
const path = require("node:path");
// Controllers
const User = require("./controllers/user");

let genPrimesRequestCount = 0;

module.exports = (server) => {
  // ------------------------------------------------ //
  // ************ USER ROUTES ************* //
  // ------------------------------------------------ //

  // Log a user in and give them a token
  server.route("post", "/api/login", User.logUserIn);

  // Log a user out
  server.route("delete", "/api/logout", User.logUserOut);

  // Send user info
  server.route("get", "/api/user", User.sendUserInfo);

  // Update a user info
  server.route("put", "/api/user", User.updateUser);

  // ------------------------------------------------ //
  // ************ PRIME NUMBER ROUTES ************* //
  // ------------------------------------------------ //

  server.route("get", "/api/primes", (req, res) => {
    console.log(
      `Recieved /api/primes request, current # of requests in flight: ${genPrimesRequestCount}`
    );

    const count = +req.params.get("count");
    const start = +req.params.get("start");
    const startExecution = performance.now();
    //Note creating a new thread for each request is bad practice :(
    // Better approach is to use a thread pool and submit tasks to it.
    const w = new Worker(path.resolve(__dirname, "worker.js"), {
      workerData: { count, start },
    });
    genPrimesRequestCount++;

    const wkr = `Worker ${w.threadId}`;
    console.log(
      `Request to generate ${count} primes starting from ${start} is being processed by ${wkr}`
    );

    let primesToReturn = [];

    w.on("message", (primes) => {
      primesToReturn = primes;
    });

    w.on("error", (err) => {
      console.error(`An error occured in ${wkr}`, err);
    });

    w.on("exit", (code) => {
      const executionTime = (
        (performance.now() - startExecution) /
        1000
      ).toFixed(3);
      genPrimesRequestCount--;

      if (code !== 0) {
        console.error(`${wkr} did not exit successfully`);
        res.status(500).json({
          message:
            "An error occured while generating the prime numbers, please try again!",
        });
      } else {
        console.log(`${wkr} exited successfully`);
        res.json({
          primes: primesToReturn,
          time: executionTime,
        });
      }
    });
  });
};
