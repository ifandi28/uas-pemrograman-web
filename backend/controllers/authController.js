const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (req, res) => {

    const { nama, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser(
            nama,
            email,
            hashedPassword,

            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: "Register berhasil"
                });

            }
        );

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    register
};