const { spawn, exec } = require("node:child_process");

// the spawn function is used to exectute a unix executable file
// when we execute a file using spawn, we get a child process object which means we are creating a new process
// the child process object is an instance of the EventEmitter class
// the spawn function takes 3 arguments
// the first argument is the name of the executable file
// the second argument is an array of arguments to pass to the executable file
// the third argument is an object that contains options for the child process
const child = spawn("ls", ["-lh", "/usr"]);

exec("ls -lh /usr", (error, stdout, stderr) => {});
