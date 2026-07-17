const Peminjaman = require("../models/peminjamanModel");

// ============================
// Ambil semua data peminjaman
// ============================

const getAllPeminjaman = (req, res) => {

    Peminjaman.getAll((err, result) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.json(result);

    });

};

// ============================
// Tambah peminjaman
// ============================

const createPeminjaman = (req, res) => {

    Peminjaman.create(req.body, (err) => {

        if (err) {

            if (err === "BUKU_SUDAH_DIPINJAM") {

                return res.status(400).json({
                    message: "Buku sedang dipinjam."
                });

            }

            return res.status(500).json({
                message: err.message
            });

        }

        res.status(201).json({
            message: "Data peminjaman berhasil ditambahkan"
        });

    });

};

const kembalikanBuku = (req, res) => {

    Peminjaman.kembalikan(req.params.id, (err) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.json({
            message: "Buku berhasil dikembalikan"
        });

    });

};

// ============================
// Export
// ============================

module.exports = {

    getAllPeminjaman,
    createPeminjaman,
    kembalikanBuku

};