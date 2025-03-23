import app from "../src/server";

export default async function handler(req, res) {
  return app(req, res);
}
