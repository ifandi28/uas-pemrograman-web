const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

// REGISTER
const register = async (req, res) => {
    const { nama, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(nama, email, hashedPassword, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            res.status(201).json({
                message: "Register berhasil"
            });
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// LOGIN
const login = (req, res) => {

    const { email, password } = req.body;

    User.findByEmail(email, async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Email tidak ditemukan"
            });
        }

        const user = result[0];

        const cocok = await bcrypt.compare(password, user.password);

        if (!cocok) {
            return res.status(401).json({
                message: "Password salah"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login berhasil",
            token
        });

    });

};

module.exports = {
    register,
    login
};