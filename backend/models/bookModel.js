const db = require("../config/database");

const getAllBooks = (callback) => {
    db.query("SELECT * FROM books", callback);
};

const getBookById = (id, callback) => {
    db.query("SELECT * FROM books WHERE id = ?", [id], callback);
};

const createBook = (judul, penulis, penerbit, tahun, callback) => {
    db.query(
        "INSERT INTO books (judul, penulis, penerbit, tahun) VALUES (?,?,?,?)",
        [judul, penulis, penerbit, tahun],
        callback
    );
};

const updateBook = (id, judul, penulis, penerbit, tahun, callback) => {
    db.query(
        "UPDATE books SET judul=?, penulis=?, penerbit=?, tahun=? WHERE id=?",
        [judul, penulis, penerbit, tahun, id],
        callback
    );
};

const deleteBook = (id, callback) => {
    db.query(
        "DELETE FROM books WHERE id=?",
        [id],
        callback
    );
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};