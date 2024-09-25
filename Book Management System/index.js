const express = require("express");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const app = express();
const book_path = path.join(__dirname, "books.json");

app.use(express.json());

const validationRules = [
  body("title").notEmpty().isString().isLength({ max: 100 }),
  body("author").notEmpty().isString().isLength({ max: 100 }),
  body("year").notEmpty().isNumeric(),
  body("genre").optional().isString().isLength({ max: 30 }),
];

const getBooks = () => JSON.parse(fs.readFileSync(book_path));
const saveBooks = (books) => fs.writeFileSync(book_path, JSON.stringify(books));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Book Store");
});

app.get("/api/books", (req, res) => {
  let books = getBooks();
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const author = req.query?.author?.trim().toLowerCase() || "";
  const genre = req.query?.genre?.trim().toLowerCase() || "";

  const totalBooks = books.length;

  if (author || genre) {
    books = books?.filter(
      (b) =>
        (author && b.author.toLowerCase().includes(author)) ||
        (genre && b.genre.toLowerCase().includes(genre))
    );
  }
  const filteredBooks = books.length;
  const totalPages = Math.ceil(filteredBooks / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedBooks = books.slice(startIndex, endIndex);

  res.status(200).json({
    totalBooks,
    filteredBooks,
    totalPages,
    currentPage: page,
    pageSize,
    books: paginatedBooks,
  });
});

app.get("/api/book/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const books = getBooks();
  const book = books.find((b) => b.id === id);
  if (book) res.status(200).json(book);
  else res.status(404).send("Book not found.");
});

app.post("/api/book", validationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, year, genre } = req.body;
  const books = getBooks();

  const newBook = {
    id: books.length + 1 || 1,
    title,
    author,
    year,
    genre,
  };

  books.push(newBook);

  saveBooks(books);

  res.status(200).json(newBook);
});

app.put("/api/book/:id", validationRules, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, author, year, genre } = req.body;
  const { id } = req.params;
  const books = getBooks();
  const bookIndex = books.findIndex((b) => b.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ msg: "Book not found." });
  }

  books[bookIndex] = {
    ...books[bookIndex],
    title,
    author,
    year,
    genre,
  };

  saveBooks(books);

  res.status(200).json(books[bookIndex]);
});

app.delete("/api/book/:id", (req, res) => {
  const { id } = req.params;
  const books = getBooks();
  const bookIndex = books.findIndex((b) => b.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ msg: "Book not found." });
  }
  const deletedBook = books.splice(bookIndex, 1);

  saveBooks(books);

  res.status(200).json({ msg: "Book deleted successfully", deletedBook });
});

app.use((req, res) => {
  res.status(404).send({ error: "Resource not found" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port: ${port}.`));
