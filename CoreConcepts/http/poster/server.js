const Butter = require("../butter");

// nock users db table
const users = [
  {
    id: 1,
    name: "Mike Brown",
    username: "mBrown123",
    password: "12345",
  },
  {
    id: 2,
    name: "John Doe",
    username: "joDoe123",
    password: "12345",
  },
  {
    id: 3,
    name: "Jane Doe",
    username: "jaDoe123",
    password: "12345",
  },
];

// mock users post table
const posts = [
  {
    id: 1,
    title: "Post 1",
    body: "This is the first post",
    userId: 1,
  },
];

// { userId: 1, sessionId: "12345" }
const userSessions = [];

const PORT = 8080;

const server = new Butter();

// middlewares

//FOR AUTHENTICATION
server.beforeEach((req, res, next) => {
  const routesToAuthenticate = [
    "GET|/api/user",
    "PUT|/api/user",
    "POST|/api/posts",
    "DELETE|/api/logout",
  ];

  if (routesToAuthenticate.includes(`${req.method}|${req.url}`)) {
    const sessionId = req.headers.cookie.split("=")[1];
    const session = userSessions.find((s) => s.sessionId === sessionId);
    if (session) {
      req.userId = session.userId;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    next();
  }
});

//FOR JSON PARSING
server.beforeEach((req, res, next) => {
  // folowing appriach is only good for small JSON data
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf-8");
    });
    req.on("end", () => {
      const data = JSON.parse(body);
      req.body = data;
      next();
    });
  } else {
    next();
  }
});

// FOR FILES
server.beforeEach((req, res, next) => {
  // these are the routes for the web application, everytime a user visits these routes, the server should send the index.html file
  // the client will handle the routing on the front end
  const routes = ["/", "/login", "/profile", "/new-post"];
  if (routes.includes(req.url) && req.method === "GET") {
    return res.status(200).sendFile(`./public/index.html`, "text/html");
  } else {
    next();
  }
});

// ----- Static routes ----

server.route("GET", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});
server.route("GET", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

// ----- JSON routes ----
server.route("POST", "/api/login", (req, res) => {
  const user = users.find(
    (user) =>
      user.username === req.body.username && user.password === req.body.password
  );
  if (user) {
    const sessionId = Math.floor(Math.random() * 10000000).toString();
    userSessions.push({ userId: user.id, sessionId });
    res.setHeader("Set-Cookie", `sessionId=${sessionId}; Path=/`);
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

server.route("DELETE", "/api/logout", (req, res) => {});

server.route("GET", "/api/posts", (req, res) => {
  const p = posts.map((post) => {
    const user = users.find((user) => user.id === post.userId);
    post.author = user.username;
    return post;
  });
  res.status(200).json(p);
});
server.route("POST", "/api/posts", (req, res) => {
  const postId = posts.length + 1;
  const newPost = {
    id: postId,
    title: req.body.title,
    body: req.body.body,
    userId: req.userId,
  };
  posts.push(newPost);
  res.status(201).json({ message: "Post created", postId });
});
server.route("GET", "/api/user", (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  res.status(200).json({ username: user.username, name: user.name });
});

//route to update a users information
server.route("PUT", "/api/user", (req, res) => {
  //get the current users information
  const user = users.find((u) => u.id === req.userId);
  const newName = req.body.name;
  const newUsername = req.body.username;
  const newPassword = req.body.password;
  if (users.find((u) => u.username === newUsername)) {
    res.status(400).json({ message: "Username already exists" });
  }
  user.name = newName;
  user.username = newUsername;
  user.password = newPassword;
  res.status(201).end();
});
server.route("DELETE", "/api/logout", (req, res) => {
  const sessionId = req.headers.cookie.split("=")[1];
  const index = userSessions.findIndex((s) => s.sessionId === sessionId);
  userSessions.splice(index, 1);
  res.status(200).json({ message: "Logged out" });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
