const { Sequelize } = require("sequelize");
const pg = require("pg");
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL tidak ditemukan");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Koneksi ke Database berhasil!");
  } catch (error) {
    console.error("Tidak dapat terhubung ke Database:", error);
  }
};

module.exports = { sequelize, testConnection };
