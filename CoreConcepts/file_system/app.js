/**
 * 3 differerent ways to to work wit files
 * Using the Promises API => require('node:fs/promises');
 * Using the Callback API => require('node:fs')
 * callback-based versions of the node:fs module APIs are preferable over the use of the promise APIs
 * when maximal performance (both in terms of execution time and memory allocation) is required.
 * Using the synchronous API (not recommended)
 *  Synchronous APIs block the Node.js event loop and further JavaScript execution until the operation is complete
 */
// ****** Promise API ****** //
// const fs = require("fs/promises");

// (async () => {
//   try {
//     await fs.copyFile("file.txt", "copied-promise.txt");
//   } catch (error) {
//     console.log(error);
//   }
// })();

// ****** Callback API ****** //
// const fs = require("fs");

// fs.copyFile("file.txt", "copied-callback.txt", (error) => {
//   if (error) console.log(error);
// });

// ****** Synchronous API ****** //
// const fs = require("fs");

// fs.copyFileSync("file.txt", "copied-sync.txt");

/**
 * ------  File system application  ------------------------
 */

const fs = require("fs/promises");
const { Buffer } = require("buffer");

const commandFile = `${__dirname}/command.txt`;
const expectedCommands = {
  add: "add to the file",
  create: "create a file",
  rename: "rename the file",
  delete: "delete the file",
};

const createFile = async (filePath) => {
  try {
    const fileToCheck = await fs.open(filePath, "r");
    await fileToCheck.close();
    console.log(`File ${filePath} already exists`);
  } catch (e) {
    // file does not exist so we are going to creae it
    const file = await fs.open(filePath, "w");
    await file.close();
  }
};
const deleteFile = async (file) => {
  await fs.rm(file, { force: true });
};
const renameFile = async (currFileName, newFileName) => {
  try {
    const file = await fs.open(currFileName, "r");
    await file.close();
  } catch (e) {
    console.error(
      `The file ${currFileName} could not be renamed becuase it does not exist.`
    );
    return;
  }
  try {
    const file = await fs.open(newFileName, "r");
    await file.close();
    console.warn(
      `Skipping operation as the file ${newFileName} already exists!`
    );
    return;
  } catch (e) {
    const success = await fs.rename(currFileName, newFileName);
    if (success === undefined) {
      console.log(`Successfully renamed ${currFileName} to ${newFileName}`);
    } else {
      console.error(
        `An error occurred while renaming ${currFileName} to ${newFileName}`,
        e
      );
    }
  }
};
const addToFile = async (file, content) => {
  try {
    const fileToAppend = await fs.open(file, "a+");
    fileToAppend.appendFile(content + "\n");
    await fileToAppend.close();
    return;
  } catch (e) {
    if (e.code === "ENOENT") {
      console.error(`File: ${file} does not exist!`);
    } else {
      console.error(
        `An error occurred while appending ${content} to ${file}:`,
        e
      );
    }
  }
};

(async () => {
  const commandFileHandle = await fs.open(commandFile, "r");

  commandFileHandle.on("change", async () => {
    // get some information about the file
    const stats = await commandFileHandle.stat();
    // get the size of the file
    const fileSize = stats.size;
    // create a new buffer to hold the contents of the file
    const fileBuff = Buffer.alloc(fileSize);
    // read the contents of the file
    await commandFileHandle.read(fileBuff, 0, fileBuff.byteLength, 0);
    const command = fileBuff.toString("utf-8");

    //create a file <path>
    if (command.includes(expectedCommands.create)) {
      //crate the file specified after the command
      const fileToCreate = command
        .substring(expectedCommands.create.length + 1)
        .trim();
      console.log(`Attempting to create: ${fileToCreate}`);
      await createFile(fileToCreate);
    } else if (command.includes(expectedCommands.delete)) {
      //delete the file <path>
      const file = command.substring(expectedCommands.delete.length + 1).trim();
      console.log(`Attempting to delete: ${file}`);
      await deleteFile(file);
    } else if (command.includes(expectedCommands.rename)) {
      //rename the file <path> to <new-path>
      const newPathIdx = command.indexOf("to ");
      const file1 = command
        .substring(expectedCommands.rename.length + 1, newPathIdx)
        .trim();
      const file2 = command.substring(newPathIdx + 3).trim();
      console.log(`Attempting to rename: ${file1} to ${file2}`);
      await renameFile(file1, file2);
    } else if (command.includes(expectedCommands.add)) {
      //add to the file <path> content: <content>
      const contentIndx = command.indexOf(" content: ");
      const file = command
        .substring(expectedCommands.add.length + 1, contentIndx)
        .trim();

      const content = command.substring(contentIndx + 10);
      console.log(`Adding to file: ${file}`);
      console.log(`Content: ${content}`);
      addToFile(file, content);
    } else {
      const commands = Object.values(expectedCommands);
      console.log(`INVALID COMMAND. Must be one of:`, JSON.stringify(commands));
    }
  });

  try {
    const watcher = fs.watch(commandFile);
    for await (const event of watcher) {
      if (event.eventType === "change") {
        commandFileHandle.emit("change");
      }
    }
    commandFileHandle.close();
  } catch (err) {
    commandFileHandle.close();
    throw err;
  }
})();
