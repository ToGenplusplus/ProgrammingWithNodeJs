const http = require("node:http");

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("---METHOD---");
  console.log(req.method);
  console.log("---URL---");
  console.log(req.url);
  console.log("---HEADERS---");
  console.log(req.headers);
  console.log("----DATA----");

  let requestData = "";
  req.on("data", (data) => {
    requestData += data.toString();
  });

  req.on("end", () => {
    console.log("data recieved from client:");
    console.log(requestData);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is the response from the server" })
    );
  });
});

server.listen(8080, () => {
  console.log("Server is listening on http://localhost:8080");
});
