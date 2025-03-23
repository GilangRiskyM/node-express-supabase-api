const app = require("../src/server.js");

module.exports = (req, res) => {
  return app(req, res);
};
