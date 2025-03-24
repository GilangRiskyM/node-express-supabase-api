require("dotenv").config();

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res
      .status(401)
      .json({
        success: false,
        message: "Anda tidak memiliki otoritasi! Cek API Key Anda!",
      });
  }

  next();
};

module.exports = apiKeyAuth;
