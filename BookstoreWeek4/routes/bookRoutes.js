const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBookById,
} = require("../controllers/bookController");
const { bookSchema, validate } = require("../middlewares/validateBook");

const bookRoutes = express.Router();

bookRoutes.get("/", getAllBooks);

bookRoutes.post("/", validate(bookSchema), addBook);

bookRoutes.get("/:id", getBookById);

bookRoutes.put("/:id", validate(bookSchema), updateBook);

bookRoutes.delete("/:id", deleteBookById);

module.exports = bookRoutes;
