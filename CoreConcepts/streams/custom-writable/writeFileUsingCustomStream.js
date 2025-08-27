const { FileWriteStream } = require("./customWrtiable");

const NUM_TO_WRITE = 1000000;
const file_name = "text.txt";
(async () => {
  console.time(`Writing 1 to ${NUM_TO_WRITE}`);
  const mStream = new FileWriteStream({fileName: `${__dirname}/${file_name}`})
  let i = 1;
  let numDrainEvents = 0;
  let canWriteToStream = true;

  const writeToFile = () => {
    while (canWriteToStream && i <= NUM_TO_WRITE) {
      if (i === NUM_TO_WRITE) {
        mStream.end(`${i}`);
        break;
      }
      canWriteToStream = mStream.write(`${i} `);
      i++;
    }
  };
  writeToFile();
  mStream.on("drain", () => {
    canWriteToStream = true;
    numDrainEvents++;
    writeToFile();
  });

  mStream.on("close", () => {
    console.log(`Wrote to destination ${numDrainEvents} times!`);
    console.timeEnd(`Writing 1 to ${NUM_TO_WRITE}`);
  });
})();
