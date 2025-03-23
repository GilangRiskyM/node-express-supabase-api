const { sequelize } = require("../config/database");
const Siswa = require("./siswa");

const models = {
  Siswa,
};

module.exports = { sequelize, models };
