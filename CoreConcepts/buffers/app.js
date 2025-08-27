const { Buffer, constants } = require("buffer");

const BUFFER_SIZE_IN_BYTES = 4;
const memeoryAllocation = Buffer.alloc(BUFFER_SIZE_IN_BYTES);
// console.log(memeoryAllocation);
//<Buffer 00 00 00 00>
memeoryAllocation[1] = 0xff;
// console.log(memeoryAllocation[1]);

//----------------------------Challenge------------------------------------
// Store the following sequeuence of 0 and 1's in a buffervariable a log to console
// 0100 1000 0110 1001 0010 0001

const challengeBuffer = Buffer.alloc(3); //this will create a buffer with 3 bytes and fill all bytes with 0's

challengeBuffer[0] = 0x48;
challengeBuffer[1] = 0x69;
challengeBuffer[2] = 0x21;

// console.log(challengeBuffer.toString("utf-8"));

//----------allocating huge buffers--------------------------------
const huge = Buffer.alloc(5e8); //500 mb => 500 000 000 Bytes

huge.fill(0x10); // fill each byte in buffer with 0x10

constants.MAX_LENGTH; // by default is 4GB

// ---------------------------Different ways to allocate buffers -----------
const arrBuff = Buffer.from([0x48, 0x69, 0x21]);
const strBuff = Buffer.from("010010000110100100100001", "binary");

console.log(Buffer.poolSize); //pre allocated buffer size by node in memory = 8192 bytes

// fast way to allocate a certain amount of memory (does not take into account what is already allocated)
const buffFast = Buffer.allocUnsafe(10000);
// if you specify a value for # of bytes that is < Math.floor(Buffer.poolSize/2) this will uses the pre allocated memory
// causing the allocation to be the FASTEST way to allocate memory.
// only works using allocUnsafe() not alloc()
