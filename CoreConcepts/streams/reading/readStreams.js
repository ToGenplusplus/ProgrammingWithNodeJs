const fs = require("fs/promises");

// (async () => {
//   console.time("READING");
//   const readFile = await fs.open(`${__dirname}/../writing/numbers.txt`, "r");
//   const writeFile = await fs.open(`${__dirname}/dest.txt`, "w");
//   const readStream = readFile.createReadStream();
//   const writeStream = writeFile.createWriteStream();

//   readStream.on("data", (chunk) => {
//     if (!writeStream.write(chunk)) {
//       readStream.pause();
//     }
//   });

//   writeStream.on("drain", () => {
//     readStream.resume();
//   });

//   readStream.on("end", () => {
//     console.timeEnd("READING");
//     console.log("---- FINISHED READING STREAM---");
//   });

//   // readFile.close();
//   // writeFile.close();
// })();

/**
 * Read from million.txt.
 */
(async () => {
  console.time("READING");
  const readFile = await fs.open(`${__dirname}/../writing/million.txt`, "r");
  const writeFile = await fs.open(`${__dirname}/one_to_million_even.txt`, "w");
  const readStream = readFile.createReadStream();
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
    console.log(numbers);
    console.log("isCorrect:", verifyChunk(numbers));

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
    readFile.close();
  });
})();

function verifyChunk(chunk) {
  // check if every nuber in chunk is == 1 + number before it
  return chunk.every((number, index) => {
    if (index > 0) {
      if (Number(number) - 1 === Number(chunk[index - 1])) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  });
}
