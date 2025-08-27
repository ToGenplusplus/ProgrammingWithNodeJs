const { Buffer } = require("node:buffer");
const fs = require("fs/promises");

// function to copy contents of a file to another file using buffer
(async () => {
  console.time("copy runtime:");
  const srcFile = await fs.open(`${__dirname}/copy-src.txt`, "r");
  const destFile = await fs.open(`${__dirname}/text-copy.txt`, "w");

  let bytesRead = -1;

  while (bytesRead !== 0) {
    const readContent = await srcFile.read();
    bytesRead = readContent.bytesRead;
    // default highWaterMark for file system reads is 16384 bytes,
    // if we dont get these number of bytes, it means we just read the last chars in our file
    // the reminaing 16384 - bytesRead bytes will be filled with 0's which we don't want to copy over
    if (bytesRead !== 16384) {
      const finalBuffer = Buffer.alloc(bytesRead);
      const first0Entry = readContent.buffer.indexOf(0);
      readContent.buffer.copy(finalBuffer, 0, 0, first0Entry);
      destFile.write(finalBuffer);
      break;
    } else {
      await destFile.write(readContent.buffer);
    }
  }

  await srcFile.close();
  await destFile.close();
  console.timeEnd("copy runtime:");
})();
