const db = require("../src/DB");
const { handleVideoResizeRequest } = require("./videoUtils");

class JobQueue {
  constructor() {
    this.jobs = [];
    // { type: "string", id: string, job: function }
    this.currentJob = null;
    this.getJobsFromDb();
  }

  getJobsFromDb() {
    db.update();
    db.videos.forEach((video) => {
      for (const resizeKey in video.resizes) {
        if (video.resizes[resizeKey].processing) {
          const [width, height] = resizeKey.split("x");
          this.enqueueJob({
            type: "resize",
            id: `${video.videoId}-${width}-${height}`,
            job: async () => {
              return await handleVideoResizeRequest(
                video.videoId,
                width,
                height
              );
            },
          });
        }
      }
    });
  }

  enqueueJob(job) {
    const findJob = this.jobs.findIndex(
      (queuedJobs) => queuedJobs.id === job.id
    );
    if (findJob !== -1) {
      console.log(`Job with id: ${job.id} is already in the queue`);
      return;
    }
    this.jobs.push(job);
    this.executeNextJob();
  }

  dequeue() {
    if (this.jobs.length === 0) {
      return null;
    }
    return this.jobs.shift();
  }

  executeNextJob() {
    if (this.currentJob) return;
    const nextJob = this.dequeue();
    if (nextJob) {
      const { type, id, job } = nextJob;
      this.currentJob = nextJob;
      console.log(`Executing ${type} job. Id: ${id}`);

      job()
        .then(() => {
          this.currentJob = null;
          console.log("Job completed successfully");
          console.log(
            "Nuber of jobs remaining in the queue:",
            this.jobs.length
          );
          this.executeNextJob();
        })
        .catch((error) => {
          console.error("Error executing job:", error);
          this.currentJob = null;
          this.executeNextJob();
        });
    }
  }
}

module.exports = JobQueue;
