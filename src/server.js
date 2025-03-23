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
    message: "Welcome to the API",
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
      console.log("Database synced successfully");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
    });
}

// Untuk Vercel deployment (serverless)
module.exports = app;
