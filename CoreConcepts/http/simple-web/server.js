const Butter = require("../butter");

const butter = new Butter();

butter.route("GET", "/", async (req, res) => {
  res.status(200).json("Hello World");
});
butter.route("GET", "/test", async (req, res) => {
  res.status(204).end();
});

butter.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
