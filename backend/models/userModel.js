const db = require("../config/database");

const createUser = (nama, email, password, callback) => {
    const sql =
        "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";

    db.query(sql, [nama, email, password], callback);
};

module.exports = {
    createUser
};