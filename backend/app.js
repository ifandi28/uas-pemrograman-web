require("dotenv").config();
console.log("JWT_SECRET =", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const verifyToken = require("./middleware/authMiddleware");
const peminjamanRoutes = require("./routes/peminjamanRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/peminjaman", peminjamanRoutes);

// Home
app.get("/", (req, res) => {
    res.json({
        message: "Backend berjalan"
    });
});

// Profile
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