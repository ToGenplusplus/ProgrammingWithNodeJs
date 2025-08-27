// function to delete a file
// function to delete a directory and all its contents
const fs = require("node:fs/promises");

const util = {};

util.deleteFile = async (path) => {
  try {
    await fs.unlink(path);
  } catch (err) {
    console.error(err);
  }
};

util.deleteFolder = async (path) => {
  try {
    await fs.rm(path, { recursive: true, force: true });
  } catch (err) {
    console.error(err);
  }
};

module.exports = util;
