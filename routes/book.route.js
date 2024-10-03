const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.get("/getAllBooks", bookController.getAllBooks);

router.get("/getBookById/:id", bookController.getBookById);

router.get("/getAllBooksByUserId/:id", bookController.getAllBooksByUserId);

router.post("/createBook", bookController.createBook);

router.put("/updateBookById/:id", bookController.updateBookById);

router.delete("/deleteBookById/:id", bookController.deleteBookById);

module.exports = router;
