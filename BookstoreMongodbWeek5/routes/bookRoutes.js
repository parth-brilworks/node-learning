const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBookById,
} = require("../controllers/bookController");

const bookRoutes = express.Router();

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Retrieve a list of all books
 *     description: Fetches all books from the database, including author and category details.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The book ID.
 *                   title:
 *                     type: string
 *                     description: The book title.
 *                   authorId:
 *                     type: object
 *                     description: Author details.
 *                   categoryId:
 *                     type: object
 *                     description: Category details.
 *                   year:
 *                     type: integer
 *                     description: The book's publication year.
 */
bookRoutes.get("/", getAllBooks);

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Add a new book
 *     description: Adds a new book to the database, associating it with an existing author and category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title.
 *               authorId:
 *                 type: string
 *                 description: The ID of the author for the book.
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category for the book.
 *               publicationYear:
 *                 type: integer
 *                 description: The year the book was published.
 *     responses:
 *       201:
 *         description: Book created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The book ID.
 *                 title:
 *                   type: string
 *                   description: The book's title.
 *                 authorId:
 *                   type: string
 *                   description: The associated author ID.
 *                 categoryId:
 *                   type: string
 *                   description: The associated category ID.
 *                 year:
 *                   type: integer
 *                   description: The book's publication year.
 *       400:
 *         description: Invalid authorId or categoryId.
 */
bookRoutes.post("/", addBook);

/**
 * @swagger
 * /api/book/{id}:
 *   get:
 *     summary: Retrieve a specific book by ID
 *     description: Fetches a single book by ID, including author and category details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID.
 *     responses:
 *       200:
 *         description: Book details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The book ID.
 *                 title:
 *                   type: string
 *                   description: The book's title.
 *                 authorId:
 *                   type: object
 *                   description: Author details.
 *                 categoryId:
 *                   type: object
 *                   description: Category details.
 *                 year:
 *                   type: integer
 *                   description: The book's publication year.
 *       404:
 *         description: Book not found.
 */
bookRoutes.get("/:id", getBookById);

/**
 * @swagger
 * /api/book/{id}:
 *   put:
 *     summary: Update an existing book
 *     description: Updates a book's details by ID, including updating author and category associations.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The book's title.
 *               authorId:
 *                 type: string
 *                 description: The ID of the author for the book.
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category for the book.
 *               publicationYear:
 *                 type: integer
 *                 description: The year the book was published.
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The book ID.
 *                 title:
 *                   type: string
 *                   description: The book's title.
 *                 authorId:
 *                   type: string
 *                   description: The associated author ID.
 *                 categoryId:
 *                   type: string
 *                   description: The associated category ID.
 *                 year:
 *                   type: integer
 *                   description: The book's publication year.
 *       404:
 *         description: Book not found.
 *       400:
 *         description: Invalid authorId or categoryId.
 */
bookRoutes.put("/:id", updateBook);

/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Deletes a book from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID.
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       404:
 *         description: Book not found.
 */
bookRoutes.delete("/:id", deleteBookById);

module.exports = bookRoutes;
