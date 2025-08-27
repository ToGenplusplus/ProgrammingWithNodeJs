const http = require("node:http");
const fs = require("node:fs/promises");

class Butter {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.middlewares = [];
    this.server.on("request", (req, res) => {
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.sendFile = async (path, contentType) => {
        const handle = await fs.open(path, "r");
        const content = handle.createReadStream();
        res.setHeader("Content-Type", contentType);
        content.pipe(res);
      };
      res.json = (data) => {
        res.setHeader("Content-Type", "application/json");
        // here we are using res.end to send the data because size of the data is going to be less than
        // the highWaterMark values of a writable stream buffer.
        // if the size of the data is going to be more than the highWaterMark value of a writable stream buffer
        // then we should use res.write to send the data and handle the 'drain' event of the writable stream buffer.
        res.end(JSON.stringify(data));
      };
      const callback = this.routes[req.method + req.url];

      const handleMiddlewares = (req, res, middleware, index) => {
        if (index >= this.middlewares.length - 1) {
          middleware(req, res, () => {
            if (callback) {
              callback(req, res);
            } else {
              res.status(404).json({
                path: req.url,
                method: req.method,
                message: "Not Found",
              });
            }
          });
        } else {
          middleware(req, res, () => {
            handleMiddlewares(req, res, this.middlewares[index + 1], index + 1);
          });
        }
      };
      if (this.middlewares.length > 0) {
        handleMiddlewares(req, res, this.middlewares[0], 0);
      } else {
        if (callback) {
          callback(req, res);
        } else {
          res
            .status(404)
            .json({ path: req.url, method: req.method, message: "Not Found" });
        }
      }
    });
  }
  beforeEach(cb) {
    this.middlewares.push(cb);
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  /**
   * this method should be used to route requests to the appropriate handler
   * ex: butter.route("GET", "/", (req, res) => { res.status(200).sendFile() });
   * @param {*} method
   * @param {*} path
   * @param {*} handler
   */
  route(method, path, handler) {
    this.routes[method + path] = handler;
  }
}

module.exports = Butter;
