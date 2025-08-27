const { Buffer } = require("node:buffer");
const fs = require("node:fs/promises");
const { argv } = require("node:process");
const writeHugeFileUsingBuffer = async () => {
  const fileName = argv[2];
  const fileSizeBytes = +argv[3];
  console.log(
    `Attempting to generate ${fileName} with size = ${fileSizeBytes} bytes`
  );
  console.time("writeHugeFileUsingBuffer");

  const handle = await fs.open(`${fileName}`, "a");
  const stream = handle.createWriteStream();

  let drainCount = 0;

  let canWriteToStream = true;
  let bufSize = fileSizeBytes;
  const alphabetArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const writeToStream = () => {
    while (canWriteToStream && bufSize > 0) {
      const size = Math.min(stream.writableHighWaterMark - 1, bufSize);
      let buf = Buffer.alloc(size);
      bufSize -= size;
      buf.fill(alphabetArray[Math.floor(Math.random() * alphabetArray.length)]);
      canWriteToStream = stream.write(buf);
    }
    if (bufSize <= 0) {
      console.log(`${fileName} has been generated`);
      stream.end();
      handle.close();
      console.log(`drainCount = ${drainCount}`);
      console.timeEnd("writeHugeFileUsingBuffer");
    }
  };
  writeToStream();

  stream.on("drain", () => {
    drainCount++;
    canWriteToStream = true;
    writeToStream();
  });
};

writeHugeFileUsingBuffer();
