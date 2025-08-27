const cluster = require("node:cluster");
const { handleVideoResizeRequest } = require("../lib/videoUtils.js");
const JobQueue = require("../lib/jobQueue");

if (cluster.isPrimary) {
  const videoResizeJobQueue = new JobQueue();
  const coreCount = require("node:os").availableParallelism();

  for (let i = 0; i < coreCount; i++) {
    cluster.fork();
  }

  cluster.on("message", (worker, message) => {
    if (message.operation && message.operation === "resize") {
      const { videoId, width, height } = message;
      console.log(`Received resize request from Worker: ${worker.process.pid}`);
      videoResizeJobQueue.enqueueJob({
        type: "resize",
        id: `${videoId}-${width}-${height}`,
        job: async () => {
          return await handleVideoResizeRequest(videoId, width, height);
        },
      });
    }
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, signal: ${signal}`
    );
    cluster.fork();
  });
} else {
  require("./server.js");
}

//cluster.isPrimary is only avaiable if application is run in cluster mode
