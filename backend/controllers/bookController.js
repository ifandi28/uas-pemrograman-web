const Book = require("../models/bookModel");

// Ambil semua buku
const getAllBooks = (req, res) => {
    Book.getAllBooks((err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.json(result);
    });
};

// Ambil buku berdasarkan ID
const getBookById = (req, res) => {
    Book.getBookById(req.params.id, (err, result) => {

        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Buku tidak ditemukan"
            });
        }

        res.json(result[0]);

    });
};

// Tambah buku
const createBook = (req, res) => {

    const { judul, penulis, penerbit, tahun } = req.body;

    Book.createBook(
        judul,
        penulis,
        penerbit,
        tahun,
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Buku berhasil ditambahkan"
            });

        }
    );

};

// Update buku
const updateBook = (req, res) => {

    const { judul, penulis, penerbit, tahun } = req.body;

    Book.updateBook(
        req.params.id,
        judul,
        penulis,
        penerbit,
        tahun,
        (err) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Buku berhasil diupdate"
            });

        }
    );

};

// Hapus buku
const deleteBook = (req, res) => {

    Book.deleteBook(req.params.id, (err) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        res.json({
            message: "Buku berhasil dihapus"
        });

    });

};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};