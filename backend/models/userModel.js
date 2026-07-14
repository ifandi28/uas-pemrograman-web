const db = require("../config/database");

const createUser = (nama, email, password, callback) => {
    const sql = `
        INSERT INTO users (nama, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [nama, email, password], callback);
};

const findByEmail = (email, callback) => {
    const sql = `
        SELECT * FROM users
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
};

module.exports = {
    createUser,
    findByEmail
};