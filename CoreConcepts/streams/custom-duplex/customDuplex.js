const { Duplex } = require("node:stream");
const fsPromises = require("fs/promises");
const fs = require("fs");

class FileDuplexStream extends Duplex {
  constructor({ readFileName, writeFileName }) {
    super();
    this.readFileName = readFileName;
    this.writeFileName = writeFileName;
    this.chunks = [];
    this.chunksSize = 0;
    this.readFd = null;
    this.writeFd = null;
  }

  async _construct(callback) {
    try {
      this.readFd = (await fsPromises.open(this.readFileName, "r")).fd;
      this.writeFd = (await fsPromises.open(this.writeFileName, "w")).fd;
      callback();
    } catch (error) {
      callback(error);
    }
  }

  _read(size) {
    const buf = Buffer.alloc(size);
    fs.read(this.readFd, buf, 0, size, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        const copiedBuff = Uint8Array.prototype.slice.call(buf, 0, bytesRead);
        this.push(bytesRead > 0 ? copiedBuff : null);
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;
    if (this.chunksSize >= this.highWaterMark) {
      fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
        if (err) return callback(err);
      });
      this.chunks = [];
      this.chunksSize = 0;
      ++this.writesCount;
      callback();
    } else {
      callback();
    }
  }

  _final(callback) {
    if (this.chunksSize > 0) {
      fs.write(this.writeFd, Buffer.concat(this.chunks), (err) => {
        if (err) return callback(err);
      });
    }
    this.chunks = [];
    callback();
  }

  _destroy(err, callback) {
    callback(err);
  }
}

module.exports = {
  FileDuplexStream,
};
