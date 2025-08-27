const http = require("http");

const agent = new http.Agent({
  keepAlive: true,
});

const request = http.request({
  agent,
  hostname: "localhost",
  port: 8080,
  method: "POST",
  path: "/",
  headers: { "Content-Type": "application/json" },
});

//this event is only emitted once
request.on("response", (response) => {
  console.log(response.statusCode);
  console.log(response.headers);
  response.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });
});

request.end(JSON.stringify({ message: "This is going to be my last message" }));
