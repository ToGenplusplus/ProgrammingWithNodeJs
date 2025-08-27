const fs = require("fs/promises");
const { FileReadStream } = require("./fileReadStream");

const fileName = `${__dirname}/testFile.txt`;

const readStream = new FileReadStream({ fileName });

(async () => {
  console.time("READING");
  const writeFile = await fs.open(`${__dirname}/testFileRead.txt`, "w");
  const writeStream = writeFile.createWriteStream();

  let previousChunkLastElements;
  readStream.on("data", (chunk) => {
    const numbers = chunk.toString("utf-8").split(" ");
    console.log("--------------");
    if (previousChunkLastElements) {
      numbers[0] = previousChunkLastElements[1] + numbers[0];
    }
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      previousChunkLastElements = [numbers[numbers.length - 2], numbers.pop()];
    }

    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  writeStream.on("drain", () => {
    readStream.resume();
  });

  readStream.on("end", () => {
    console.timeEnd("READING");
    console.log("---- FINISHED READING STREAM---");
    writeFile.close();
  });
})();
