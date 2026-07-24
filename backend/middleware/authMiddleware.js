const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            message: "Token tidak ditemukan"
        });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN =", token);

    if (!token) {
        return res.status(401).json({
            message: "Token tidak valid"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        console.log("ERR =", err);
        console.log("USER =", user);

        if (err) {
            return res.status(403).json({
                message: "Token tidak valid atau sudah kadaluarsa"
            });
        }

        req.user = user;

        next();

    });

};

module.exports = verifyToken;