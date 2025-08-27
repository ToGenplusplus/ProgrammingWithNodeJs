const { spawn } = require("node:child_process");
const fs = require("node:fs");

const numberFormatter = spawn("./number_formatter", ["dest.txt"]);

console.log("Spawned child pid: ", numberFormatter.pid);
numberFormatter.stdout.on("data", (data) => {
  console.log("Stdout: ", data.toString());
});
numberFormatter.stderr.on("data", (data) => {
  console.log("Stderr: ", data.toString());
});
numberFormatter.on("close", async (code) => {
  console.log(`child process exited with code ${code}`);
});

///Users/temiowoaje/Desktop/learning/nodeJs_core/streams/writing/100000000.txt
const readStream = fs.createReadStream(
  "/Users/temiowoaje/Desktop/learning/nodeJs_core/streams/writing/100000000.txt"
);
readStream.pipe(numberFormatter.stdin);
