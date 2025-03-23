const app = require("../src/server");

module.exports = async function handler(req, res) {
  return app(req, res);
};
