const db = require("../config/database");

// Ambil semua data
const getAll = (callback) => {

    db.query(
        "SELECT * FROM peminjaman",
        callback
    );

};

// Tambah peminjaman
const create = (data, callback) => {

    // Cek apakah buku masih dipinjam
    db.query(

        "SELECT * FROM peminjaman WHERE judul_buku = ? AND status = 'Dipinjam'",

        [data.judul_buku],

        (err, result) => {

            if (err) {

                return callback(err);

            }

            if (result.length > 0) {

                return callback("BUKU_SUDAH_DIPINJAM");

            }

            db.query(

                `INSERT INTO peminjaman
                (nama_peminjam, judul_buku, tanggal_pinjam, tanggal_kembali, status)
                VALUES (?, ?, ?, ?, ?)`,

                [
                    data.nama_peminjam,
                    data.judul_buku,
                    data.tanggal_pinjam,
                    data.tanggal_kembali,
                    data.status
                ],

                callback

            );

        }

    );

};

const kembalikan = (id, callback) => {

    db.query(

        "UPDATE peminjaman SET status='Dikembalikan' WHERE id=?",

        [id],

        callback

    );

};


module.exports = {

    getAll,
    create,
    kembalikan

};