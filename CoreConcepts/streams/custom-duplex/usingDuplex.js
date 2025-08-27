const { FileDuplexStream } = require("./customDuplex");

const readFile = `${__dirname}/text.txt`;
const writeFile = `${__dirname}/occurrences.txt`;

//count number of occurrens of each word in file and write data to another file.
const wordsMap = {};
(() => {
  const dupStream = new FileDuplexStream({
    readFileName: readFile,
    writeFileName: writeFile,
  });

  const writeWordStats = () => {
    const wordsMapKeys = Object.keys(wordsMap);
    wordsMapKeys.forEach((key, index) => {
      const data = `${key} => ${wordsMap[key]}\n`;
      if (index === wordsMapKeys.length - 1) {
        dupStream.end(Buffer.from(data));
        console.log("Finished writing word occurences to file!");
        return;
      }
      if (!dupStream.write(Buffer.from(data))) {
        dupStream.pause();
        return;
      }
    });
  };

  dupStream.on("data", (chunk) => {
    const data = chunk.toString("utf-8").split(" ");
    data.forEach((word) => {
      const lower = word.toLowerCase();
      if (wordsMap[lower]) {
        let val = (wordsMap[lower] += 1);
        wordsMap[lower] = val;
      } else {
        wordsMap[lower] = 1;
      }
    });
  });

  dupStream.on("end", () => {
    console.log("no more content to read");
    writeWordStats();
  });

  dupStream.on("drain", () => {
    dupStream.resume();
    writeWordStats();
  });
})();
