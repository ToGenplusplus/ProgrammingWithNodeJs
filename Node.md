# Node JS

https://www.deepintodev.com/blog/how-nodejs-works-behind-the-scenes?utm_source=tldrwebdev

## What is Node.js?

- Node uses a single-threaded event loop to handle multiple connections concurrently. This is different from the traditional multi-threaded approach used in many server-side languages.
- libuv

  - It's a C library used by Node.js to manage asynchronous I/O operations.
  - Directly uses the operating system's APIs.
  - Abstracts operating system-specific mechanisms (IOCP on Windows, epoll on Linux, etc.).
  - An independent component that comes with Node.js.

## Node Execution

- The Node.js runtime is built on top of the V8 JavaScript engine, which is responsible for executing JavaScript code.
- v8 is a C++ program that takes javascript code as input and produces machine code.
- The javascript file is read line by line serially

## Event Loop

- The event loop is a core part of Node.js that allows it to handle asynchronous operations.
- It continuously checks for events and executes the corresponding callbacks.
- The event loop has several phases, including timers, I/O callbacks, idle, poll, check, and close callbacks.
- Each phase has its own queue of callbacks
- before we enter the event loop, we have to execute the code in the stack first. This is the initial phase of execution.
- process.netTick() is executed after every phase of the event loop.

  - It can be a good indicator to know when the initial phase really ends, and when the event loop is about to start.
  - example:
  - ```javascript
    console.log("start");
    for (let i = 0; i < 1000000; i++);
    console.log("end");
    setTimeout(() => console.log("timer"), 0);
    process.nextTick(() => console.log("nextTick"));

    // output: start end nextTick timer
    ```

    - examle:

    ````javascript
    const fs = require("node:fs/promises");

    async function readFile() {
        console.log("reading file");
        const data = await fs.readFile("text.txt", "utf8");
        console.log("File content:", data);
        console.log("File read successfully");
    }

    readFile()
    process.nextTick(() => {
      console.log("inside nextTick callback");
    });

    console.log("File read operation initiated");

    // output:
    // reading file
    // File read operation initiated
    // inside nextTick callback
    // File content: <content of text.txt>
    // File read successfully
    ```
    ````

### Timers

- This phase executes callbacks scheduled by `setTimeout()` and `setInterval()`.

### Pending Callbacks

This is where Node.js deals with "leftover" callbacks from the previous loop, especially those related to system operations. These are typically callbacks related to system operations like TCP error handling.

### Idle, Prepare

- This phase is used internally by Node.js and is not typically used by developers.
  The idle phase is where Node.js might perform some internal cleanup tasks when the loop has nothing else to do.
- The prepare phase is where Node.js gets ready to enter the poll phase, setting up anything needed before checking for new I/O events.
  - This is a strategic moment in the event loop cycle when Node.js can perform necessary setup operations before potentially blocking for I/O in the upcoming Poll phase.

### Poll

- probably the most important phase in our event loop.
- Looks for new I/O events (like incoming network connections or file operations)
  Executes callbacks for those I/O events that are ready
  May temporarily pause here ("block") to wait for new events if there's nothing else to do.

### Check

- This is specifically where setImmediate() callbacks run.
- setImmediate() is a special timing function in Node.js that lets you schedule a callback to run immediately after the poll phase. It's useful when you want to execute code right after any pending I/O operations but before any new timers.

### Close Callbacks

this final phase handles cleanup callbacks - specifically those related to closing resources like sockets or file handles. For example, when a network connection closes, the socket's 'close' event callback would run in this phase.

The Close Callbacks phase specifically handles callbacks that are triggered by events like:

A TCP server closing with server.close()
A socket connection ending with socket.on('close', ...)
A process exiting normally

## Good to Know

4 - Default underlying libuv thread pool size (https://nodejs.org/docs/latest-v22.x/api/cli.html#uv_threadpool_sizesize)
