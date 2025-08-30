const { Worker } = require("node:worker_threads");

class Pool {
  jobId;
  jobQueue = [];
  availableWorkers = [];

  constructor(nummberOfThreads) {
    this.nummberOfThreads = nummberOfThreads;
    this.jobId = 0;

    this.initiatePool();
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
          if (w.jobInfo.cb) {
            w.jobInfo.cb(data.results);
          }
        }

        if (data.status === "error") {
          console.log(
            `Recieved an error from ${wInfo} for job: ${data.jobId}. `
          );
        }

        this.availableWorkers.push(w);
        this.runJobs();
      });

      w.on("error", (err) => {
        console.log(`${wInfo} encounterd an error:`, err);
        this.availableWorkers.push(w);
        this.runJobs();
      });

      w.on("exit", (code) => {
        if (code !== 0) {
          console.log(`${wInfo} did not exit successfully.`);
        } else {
          console.log(`${wInfo} has exited successfully.`);
        }
      });

      this.availableWorkers.push(w);
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
    this.runJobs();
  }

  runJobs() {
    /**
     * while loop while the task
     * find an available worker
     */
    console.log(
      `Pool info: ${JSON.stringify({
        jobsInQueue: this.jobQueue.length,
        jobsInProgress: this.nummberOfThreads - this.availableWorkers.length,
      })} `
    );
    if (this.jobQueue.length > 0 && this.availableWorkers.length > 0) {
      const worker = this.availableWorkers.shift();
      const job = this.jobQueue.shift();
      //store information for the current job in the worker
      worker.jobInfo = { id: job.jobId, cb: job.cb };
      //post data to worker
      worker.postMessage({
        jobId: job.jobId,
        task: job.task,
        data: job.taskData,
      });
    }
  }
}

module.exports = Pool;
