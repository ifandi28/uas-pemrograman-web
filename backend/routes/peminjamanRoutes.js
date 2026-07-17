const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const peminjamanController = require("../controllers/peminjamanController");

// Ambil semua data peminjaman
router.get(
    "/",
    verifyToken,
    peminjamanController.getAllPeminjaman
);

// Tambah data peminjaman
router.post(
    "/",
    verifyToken,
    peminjamanController.createPeminjaman
);

router.put(

    "/:id",

    verifyToken,

    peminjamanController.kembalikanBuku

);

module.exports = router;