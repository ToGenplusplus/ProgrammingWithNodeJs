const { Worker } = require("node:worker_threads");

class Pool {
  jobId;
  jobQueue = [];
  inProgressJobs = {};
  workerPool;
  jobsCheckerInterval = 10;

  constructor(nummberOfThreads) {
    this.nummberOfThreads = nummberOfThreads;
    this.workerPool = {};
    this.jobId = 0;

    this.initiatePool();
    setInterval(() => {
      this.checkForJobSubmissions();
    }, 1000 * this.jobsCheckerInterval);
  }

  initiatePool() {
    for (let i = 0; i < this.nummberOfThreads; i++) {
      const w = new Worker("./worker");
      const wInfo = `Worker ${w.threadId}`;

      w.on("message", (data) => {
        //data = {jobId: string, status"complete"|"error", results: any | null}
        if (data.status === "complete") {
          console.log(
            `Recived completion message from ${wInfo} for job: ${data.jobId}.`
          );
          //execute the cb for the jobId with the results from the worker
          if (this.inProgressJobs[data.jobId]) {
            this.inProgressJobs[data.jobId](data.results);
          }
        }

        if (data.status === "error") {
          console.log(
            `Recieved an error from ${wInfo} for job: ${data.jobId}. `
          );
        }

        this.workerPool[w.threadId].isAvailable = true;
        delete this.inProgressJobs[data.jobId];
      });

      w.on("error", (err) => {
        console.log(`${wInfo} encounterd an error:`, err);
      });

      w.on("exit", (code) => {
        if (code !== 0) {
          console.log(`${wInfo} did not exit successfully.`);
        } else {
          console.log(`${wInfo} has exited successfully.`);
        }
      });

      this.workerPool[w.threadId] = {
        isAvailable: true,
        worker: w,
      };
    }
  }

  /**
   * @argument task - string
   * @argument taskData - object
   * @argument cb - callback to execute when the task is done
   */
  submit(task, taskData, cb) {
    /**
     * submit a job to the queue with the following parameters
     * jobId
     * taskToExecute
     * taskData
     * cb
     */
    this.jobId++;
    const id = this.jobId;
    this.jobQueue.push({
      jobId: id,
      task,
      taskData,
      cb,
    });

    console.log(`Submited job with id: ${id} to jobQueue`);
    this.checkForJobSubmissions();
  }

  checkForJobSubmissions() {
    /**
     * while loop while the task
     * find an available worker
     */
    console.log(
      "checking for jobs to submit to workers. Number of jobs in the queue: ",
      this.jobQueue.length
    );
    while (this.jobQueue.length > 0) {
      const workerObj = this.findAvailableWorker();
      if (workerObj !== null) {
        const job = this.jobQueue.shift();
        //set the job in the inprogress to its call back
        this.inProgressJobs[job.jobId] = job.cb;
        //set worker available to false
        workerObj.isAvailable = false;
        //post data to worker
        workerObj.worker.postMessage({
          jobId: job.jobId,
          task: job.task,
          data: job.taskData,
        });
      } else {
        console.log(
          `No availbale worker found, will check again in ${this.jobsCheckerInterval} seconds`
        );
        break;
      }
    }
  }

  findAvailableWorker() {
    const workerIds = Object.keys(this.workerPool);
    for (let i = 0; i < workerIds.length; i++) {
      if (this.workerPool[workerIds[i]].isAvailable) {
        return this.workerPool[workerIds[i]];
      }
    }
    return null;
  }
}

module.exports = Pool;
