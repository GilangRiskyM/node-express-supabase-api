const { models } = require("../models");
const Siswa = models.Siswa;

const getAllSiswa = async (req, res) => {
  try {
    // Ambil semua data siswa, urutkan berdasarkan NIS secara ascending
    const siswas = await Siswa.findAll({
      order: [["nis", "DESC"]], // Ubah "nama" menjadi "nis" untuk sorting berdasarkan NIS
    });

    // Cek jika tidak ada data
    if (siswas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada data siswa yang tersedia",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: siswas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat data siswa",
      error: error.message,
    });
  }
};

// Get siswa by ID
const getSiswaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi apakah ID memiliki format UUID yang benar
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        success: false,
        message: "ID siswa tidak valid",
      });
    }

    const siswa = await Siswa.findByPk(id);

    if (!siswa) {
      return res.status(404).json({
        success: false,
        message: "Data siswa tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      data: siswa,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal memuat data siswa",
      error: error.message,
    });
  }
};

// Create siswa baru
const createSiswa = async (req, res) => {
  try {
    console.log(req.body); // Debugging

    const { nama, nis, kelas, jurusan } = req.body;
    let errors = {};

    // Cek apakah NIS sudah digunakan
    const existingSiswa = await Siswa.findOne({ where: { nis } });
    if (existingSiswa) {
      return res.status(422).json({
        errors: { nis: "NIS sudah terdaftar" },
      });
    }

    // Validasi input tidak boleh kosong
    if (!nama) errors.nama = "Nama wajib diisi";
    if (!nis) errors.nis = "NIS wajib diisi";
    if (!kelas) errors.kelas = "Kelas wajib diisi";
    if (!jurusan) errors.jurusan = "Jurusan wajib diisi";

    // Validasi panjang NIS (minimal 4 karakter)
    if (nis && nis.length < 4) {
      errors.nis = "NIS minimal 4 karakter";
    }

    // Jika ada error, kirim respons ke frontend
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors });
    }

    // Buat data siswa baru
    const newSiswa = await Siswa.create({ nama, nis, kelas, jurusan });

    return res.status(201).json({
      success: true,
      data: newSiswa,
      message: "Data siswa berhasil ditambahkan",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Gagal menambah data siswa",
      error: error.message,
    });
  }
};

// Update siswa
const updateSiswa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nis, kelas, jurusan } = req.body;
    let errors = {};

    const siswa = await Siswa.findByPk(id);

    if (!siswa) {
      return res.status(404).json({
        success: false,
        message: "Data siswa tidak ditemukan",
      });
    }

    // Cek apakah NIS sudah digunakan oleh siswa lain (kecuali dirinya sendiri)
    const existingSiswa = await Siswa.findOne({ where: { nis } });
    if (existingSiswa && existingSiswa.id !== siswa.id) {
      errors.nis = "NIS sudah terdaftar oleh siswa lain";
    }

    // Validasi input tidak boleh kosong
    if (!nama) errors.nama = "Nama wajib diisi";
    if (!nis) errors.nis = "NIS wajib diisi";
    if (!kelas) errors.kelas = "Kelas wajib diisi";
    if (!jurusan) errors.jurusan = "Jurusan wajib diisi";

    // Validasi panjang NIS minimal 4 karakter
    if (nis && nis.length < 4) {
      errors.nis = "NIS minimal 4 karakter";
    }

    // Jika ada error, kirim respons ke frontend
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors });
    }

    // Update data siswa
    const updatedSiswa = await siswa.update({ nama, nis, kelas, jurusan });

    return res.status(200).json({
      success: true,
      data: updatedSiswa,
      message: "Data siswa berhasil diperbarui",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui data siswa",
      error: error.message,
    });
  }
};

// Delete siswa
const deleteSiswa = async (req, res) => {
  try {
    const { id } = req.params;

    // Pastikan ID memiliki format UUID yang valid
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return res.status(400).json({
        success: false,
        message: "ID siswa tidak valid",
      });
    }

    const siswa = await Siswa.findByPk(id);

    if (!siswa) {
      return res.status(404).json({
        success: false,
        message: "Data siswa tidak ditemukan",
      });
    }

    await siswa.destroy();

    return res.status(200).json({
      success: true,
      message: `Data siswa dengan ID ${id} berhasil dihapus`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menghapus data siswa",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSiswa,
  getSiswaById,
  createSiswa,
  updateSiswa,
  deleteSiswa,
};
