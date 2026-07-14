require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Backend berjalan"
    });
});

app.get("/api/profile", verifyToken, (req, res) => {
    res.json({
        message: "Berhasil mengakses profile",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});