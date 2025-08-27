// https://nodejs.org/docs/latest-v18.x/api/stream.html#api-for-stream-implementers
const { Writable } = require('node:stream');
const fs = require("node:fs")

class FileWriteStream extends Writable {
    constructor({highWaterMark, fileName}) {
        super({highWaterMark})
        this.chunks = []
        this.chunksSize = 0
        this.fileName = fileName
        this.fd = null
        this.highWaterMark = highWaterMark
        this.writesCount = 0
    }

    _construct(callback) {
        fs.open(this.fileName, "w", (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }

    _write(chunk, encoding, callback){
        this.chunks.push(chunk)
        this.chunksSize += chunk.length
        if (this.chunksSize >= this.highWaterMark) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) return callback(err);
            })
            this.chunks = []
            this.chunksSize = 0
            ++this.writesCount
            callback();

        } else {
            callback();
        }
    }
    _final(callback) {
        if (this.chunksSize > 0) {
            fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
                if (err) return callback(err);
            })
        }
        this.chunks = []
        callback();
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
    FileWriteStream
}