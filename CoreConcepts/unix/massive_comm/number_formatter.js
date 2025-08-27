const { stdout, stdin, stderr, argv } = require("node:process");
const fs = require("node:fs");

//read list of numbers from standard in seperated by spaces

// let filestream;
// const file = argv[2];

let canWriteToStream = true;
const destStream = fs.createWriteStream(argv[2], {
  flags: "a+",
});

destStream.on("drain", () => {
  canWriteToStream = true;
  stdin.resume();
});

stdin.on("data", (data) => {
  const numbers = data.toString().split(" ");
  const formattedNumbers = numbers.map((number) => {
    return `$${number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  });
  const formattedString = formattedNumbers.join(" ");
  //   stdout.write(formattedString);
  if (!destStream.write(formattedString)) {
    canWriteToStream = false;
    stdin.pause();
  }
});
