const http = require("node:http");
const fs = require("node:fs/promises");

const server = http.createServer();

const publicDir = `${__dirname}/public`;

server.on("request", async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.setHeader("Content-Type", "text/html");

    const handle = await fs.open(`${publicDir}/index.html`, "r");
    const content = handle.createReadStream();
    content.pipe(res);
  }

  if (req.url === "/styles.css" && req.method === "GET") {
    res.setHeader("Content-Type", "text/css");

    const handle = await fs.open(`${publicDir}/styles.css`, "r");
    const content = handle.createReadStream();
    content.pipe(res);
  }

  if (req.url === "/script.js" && req.method === "GET") {
    res.setHeader("Content-Type", "text/javascript");

    const handle = await fs.open(`${publicDir}/script.js`, "r");
    const content = handle.createReadStream();
    content.pipe(res);
  }

  if (req.url === "/login" && req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        message: "Successfully logged in",
      })
    );
  }

  if (req.url === "/user" && req.method === "PUT") {
    res.setHeader("Content-Type", "application/json");
    const response = JSON.stringify({
      message: "User is not authorized",
    });
    res.setHeader("Content-Length", Buffer.byteLength(response));
    res.statusCode = 401;
    res.write(response);
  }

  if (req.url === "/upload" && req.method === "PUT") {
    const fileHandle = await fs.open(`${__dirname}/storage/upload.png`, "w");
    const stream = fileHandle.createWriteStream();

    let canDownload = true;
    req.on("data", (chunk) => {
      if (!stream.write(chunk)) {
        canDownload = false;
        req.pause();
      }
    });

    req.on("end", () => {
      res.statusCode = 201;
      fileHandle.close();
      res.end();
    });

    stream.on("drain", () => {
      canDownload = true;
      req.resume();
      console.log("Stream drained");
    });
  }
});

server.listen(8080, () => {
  console.log("Web Server is listening on http://localhost:8080");
});
