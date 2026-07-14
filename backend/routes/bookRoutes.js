const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

router.get("/", verifyToken, bookController.getAllBooks);

router.get("/:id", verifyToken, bookController.getBookById);

router.post("/", verifyToken, bookController.createBook);

router.put("/:id", verifyToken, bookController.updateBook);

router.delete("/:id", verifyToken, bookController.deleteBook);

module.exports = router;