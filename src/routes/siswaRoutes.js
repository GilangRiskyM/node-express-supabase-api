const express = require("express");
const router = express.Router();
const {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} = require("../controllers/siswaController");
const apiKeyAuth = require("../middleware/auth"); // Import Middleware

// Gunakan Middleware API Key di semua route
router.get("/", apiKeyAuth, getAllSiswa);
router.get("/:id", apiKeyAuth, getSiswaById);
router.post("/", apiKeyAuth, createSiswa);
router.put("/:id", apiKeyAuth, updateSiswa);
router.delete("/:id", apiKeyAuth, deleteSiswa);

module.exports = router;
