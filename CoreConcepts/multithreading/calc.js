const a = 20;

// this is connected to the stdout of the main thread
// output is sent to the main thread, but if the main thread is busy the output will be delayed until the main thread is free
console.log(a);

while (true);

setInterval(() => {}, 50);

// this will cause the thread to exit. setInterval callback is registered but will never be executed
process.exit(0);

// you can also create new worker threads from within a worker thread
