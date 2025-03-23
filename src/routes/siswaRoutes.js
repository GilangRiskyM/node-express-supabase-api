const express = require("express");
const router = express.Router();
const {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} = require("../controllers/siswaController");

// GET all siswa
router.get("/", getAllSiswa);

// GET siswa by ID
router.get("/:id", getSiswaById);

// POST create siswa
router.post("/", createSiswa);

// PUT update siswa
router.put("/:id", updateSiswa);

// DELETE siswa
router.delete("/:id", deleteSiswa);

module.exports = router;
