const express = require("express");
const router = express.Router();
const siswaRoutes = require("./siswaRoutes");

router.use("/siswa", siswaRoutes);

// Root route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Siswa API",
  });
});

module.exports = router;
