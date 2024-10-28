const Book = require("../models/bookModel");
const Author = require("../models/authorModel");
const Category = require("../models/categoryModel");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("authorId categoryId");
    res.json(books);
  } catch (err) {
    next(err);
  }
};

const addBook = async (req, res, next) => {
  try {
    const { title, authorId, categoryId, publicationYear } = req.body;

    const author = await Author.findById(authorId);
    if (!author) {
      return res
        .status(400)
        .json({ message: "Invalid authorId. Author not found." });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(400)
        .json({ message: "Invalid categoryId. Category not found." });
    }

    const newBook = new Book({
      title,
      authorId,
      categoryId,
      year: publicationYear,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "authorId categoryId"
    );
    if (!book) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { title, authorId, categoryId, publicationYear } = req.body;
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    if (authorId) {
      const author = await Author.findById(authorId);
      if (!author) {
        return res
          .status(400)
          .json({ message: "Invalid authorId. Author not found." });
      }
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res
          .status(400)
          .json({ message: "Invalid categoryId. Category not found." });
      }
    }

    book.title = title || book.title;
    book.authorId = authorId || book.authorId;
    book.categoryId = categoryId || book.categoryId;
    book.year = publicationYear || book.year;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

const deleteBookById = async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBookById,
};
