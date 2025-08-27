// compression in node js

// zlib provides compression functionality implemented using Gzip, Deflate/Inflate, Brotli, and Zstd.
const zlib = require("node:zlib");

// 3 ways of compressing data: gzip, brotli, deflate

const gzip = zlib.createGzip(); // create a gzip obect (transform stream)
const brotli = zlib.createBrotliCompress();
const deflate = zlib.createDeflate();
// 3 ways of decompressing data: gunzip, brotliDecompress, inflate
const gunzip = zlib.createGunzip(); //to unzip data created using gzip
const brotliDecompress = zlib.createBrotliDecompress(); // to unzip data created using brotli
const inflate = zlib.createInflate(); // to unzip data created using deflate
