const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Siswa = sequelize.define(
  "Siswa",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "siswas",
    timestamps: true,
  }
);

module.exports = Siswa;
