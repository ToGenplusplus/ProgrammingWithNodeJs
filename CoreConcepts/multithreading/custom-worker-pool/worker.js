const { parentPort, threadId } = require("node:worker_threads");
const generatePrimes = require("../prime-generator/prime-generator");
/**
 * This file will contain code ready to be executed when it recieves a task to execute from the parent thread
 */

const wInfo = `Worker ${threadId}`;

//expoected format from parent for job request
//{jobId: number,task: string, data: obj}
// Response to parent thread format:
// {jobId: number, status"complete"|"error", results: any | null }

function workerMain() {
  console.log(`${wInfo} has started`);
  parentPort.on("message", (requestInfo) => {
    console.log(`${wInfo} recieved the following from parent:`, requestInfo);
    const result = validateRecievedJobRequest(requestInfo);
    if (result.error) {
      parentPort.postMessage({
        jobId: requestInfo.jobId,
        status: "error",
        results: result.error,
      });
    } else {
      parentPort.postMessage({
        jobId: requestInfo.jobId,
        status: "complete",
        results: result.results,
      });
    }
  });
}

function validateRecievedJobRequest(requestInfo) {
  if (requestInfo.task === undefined || requestInfo.data === undefined) {
    return { error: "No task or data present in taskRequest packet." };
  }

  if (typeof requestInfo.task !== "string") {
    return { error: "Recieved an invalid task. Must be of type string" };
  }

  switch (requestInfo.task) {
    case "generatePrimes":
      return handleGeneratePrimesRequest(requestInfo.data);
  }
  return { error: "Task to execute does not exist" };
}

function handleGeneratePrimesRequest(taskData) {
  if (taskData.count === undefined || taskData.start === undefined) {
    return {
      error: "Missing count or start params for generatePrimes request",
    };
  }

  const primes = generatePrimes(taskData.count, taskData.start);
  return { results: primes };
}

workerMain();
