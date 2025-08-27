const { Buffer } = require("node:buffer");
const { Readable } = require("node:stream");
const fs = require("node:fs");

class FileReadStream extends Readable {
  constructor({ fileName, highWaterMark }) {
    super({ highWaterMark });
    this.highWaterMark = highWaterMark;
    this.fileName = fileName;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.fileName, "r", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _read(size) {
    const buf = Buffer.alloc(size);
    fs.read(this.fd, buf, 0, size, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        const copiedBuff = Uint8Array.prototype.slice.call(buf, 0, bytesRead);
        this.push(bytesRead > 0 ? copiedBuff : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = {
  FileReadStream,
};
