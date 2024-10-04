const path = require("path");
const fs = require("fs");
const booksFilePath = path.join(__dirname, "../data/books.json");

const handleReadBooks = () => {
  console.log(booksFilePath);
  if (!fs.existsSync(booksFilePath)) {
    return [];
  }
  const data = fs.readFileSync(booksFilePath, "utf-8");
  return JSON.parse(data);
};

const handleSaveBooks = (books) =>
  fs.writeFileSync(booksFilePath, JSON.stringify(books));

const getAllBooks = (req, res, next) => {
  try {
    const books = handleReadBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

const addBook = (req, res, next) => {
  try {
    const books = handleReadBooks();
    const newBook = {
      id: books.length + 1 || 1,
      title: req.body.title,
      authorId: req.body.authorId,
      categoryId: req.body.categoryId,
      publicationYear: req.body.publicationYear,
    };
    books.push(newBook);
    handleSaveBooks(books);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

const getBookById = (req, res, next) => {
  try {
    const books = handleReadBooks();
    const matchedBook = books.find((a) => a.id === parseInt(req.params.id));
    if (!matchedBook) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(matchedBook);
  } catch (error) {
    next(error);
  }
};

const updateBook = (req, res, next) => {
  try {
    const books = handleReadBooks();
    const bookIndex = books.findIndex((a) => a.id === parseInt(req.params.id));
    if (bookIndex === -1) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    books[bookIndex] = {
      ...books[bookIndex],
      title: req.body.title || books[bookIndex].title,
      authorId: req.body.authorId || books[bookIndex].authorId,
      categoryId: req.body.categoryId || books[bookIndex].categoryId,
      publicationYear:
        req.body.publicationYear || books[bookIndex].publicationYear,
    };
    handleSaveBooks(books);
    res.json(books);
  } catch (err) {
    next(err);
  }
};

const deleteBookById = (req, res, next) => {
  try {
    const books = handleReadBooks();
    const bookIndex = books.findIndex((a) => a.id === parseInt(req.params.id));
    if (bookIndex === -1) {
      const error = new Error("Book not found");
      error.statusCode = 404;
      return next(error);
    }
    books.splice(bookIndex, 1);
    handleSaveBooks(books);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBookById,
};
