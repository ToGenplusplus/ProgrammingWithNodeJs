const fs = require("fs/promises");
const { trackMemoryUsageStats } = require("../../utils/utils");

let maxRss = 0;
let maxHeapTotal = 0;
let maxHeapUsed = 0;

/**
 * Writing to a file using streams this way IS NOT A GOOD PRACTICE!!
 * Runtime: 245.66 ms
 * uses about 240MB of memory
 */
// (async () => {
// console.time("write Many");
// const mill = await fs.open(`${__dirname}/million.txt`, "a+");
// const mStream = mill.createWriteStream();

// console.log(mStream.writableHighWaterMark); // 16384 bytes - default
// console.log(mStream.writableLength); // how many bytes ready to be written to destination
// if writableLength is more than writableHighWaterMark we are putting too much pressure on the stream
// we need to wait till the buffer has been "drained" before continuing to write
// mStream.on("drain", () => {
//   console.log("can continue to write to stream");
// });

// this is not good as our default writableHighWaterMark is 16384, yet we are writing 1million bytes without checking for the drain event
// for (let i = 1; i <= 1000000; i++) {
//   if (i % 2000 === 0) {
//     const { rss, heapTotal, heapUsed } = trackMemoryUsageStats(
//       maxRss,
//       maxHeapTotal,
//       maxHeapUsed
//     );
//     maxRss = rss;
//     maxHeapUsed = heapUsed;
//     maxHeapTotal = heapTotal;
//   }
//   mStream.write(`${i},`);
// }
// const stats = {
//   maxRss,
//   maxHeapTotal,
//   maxHeapUsed,
// };
// console.log(`STATS: ${JSON.stringify(stats)}`);
// mill.close();
// console.timeEnd("write Many");
// })();

// ----------------- IMPROVING ABOVE CODE --------------------------------
/**
 * Runtime: 480 ms
 * uses about 74MB of memory
 */
const NUM_TO_WRITE = 100000000;
const file_name = `${NUM_TO_WRITE}.txt`;
(async () => {
  console.time(`Writing 1 to ${NUM_TO_WRITE}`);
  const mill = await fs.open(`${__dirname}/${file_name}`, "a+");
  const mStream = mill.createWriteStream();
  let i = 1;
  let numDrainEvents = 0;
  let canWriteToStream = true;

  const writeToFile = () => {
    const { rss, heapTotal, heapUsed } = trackMemoryUsageStats(
      maxRss,
      maxHeapTotal,
      maxHeapUsed
    );
    maxRss = rss;
    maxHeapUsed = heapUsed;
    maxHeapTotal = heapTotal;
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
    const stats = {
      maxRss,
      maxHeapTotal,
      maxHeapUsed,
    };
    console.log(`STATS: ${JSON.stringify(stats)}`);
    console.timeEnd(`Writing 1 to ${NUM_TO_WRITE}`);
  });
})();
