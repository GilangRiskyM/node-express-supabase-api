// src/server.js
const express = require("express");
const cors = require("cors");
const { sequelize, testConnection } = require("./config/database");
const routes = require("./routes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
testConnection();

// Routes
app.use("/api", routes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Selamat datang di API sederhana",
    version: "1.0.0",
    status: "online",
  });
});

// Untuk local development
if (process.env.NODE_ENV !== "production") {
  // Sync database and start server
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Berhasil sinkronisasi dengan Database!");
      app.listen(PORT, () => {
        console.log(`Server berjalan di port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error dalam sinkronisasi dengan Database:", err);
    });
}

// Untuk Vercel deployment (serverless)
module.exports = app;
