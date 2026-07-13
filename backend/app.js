const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "perpustakaan_db",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log("❌ Gagal koneksi database");
        console.log(err);
    } else {
        console.log("✅ Berhasil terhubung ke database");
    }
});

module.exports = connection;