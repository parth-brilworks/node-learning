const express = require("express");
const {
  addAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthorById,
} = require("../controllers/authorControllers");

const router = express.Router();

/**
 * @swagger
 * /api/author:
 *   get:
 *     summary: Retrieve a list of all authors
 *     description: Fetches all authors from the database.
 *     responses:
 *       200:
 *         description: A list of authors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The author ID.
 *                   name:
 *                     type: string
 *                     description: The author's name.
 *                   biography:
 *                     type: string
 *                     description: The author's biography.
 */
router.get("/", getAllAuthors);

/**
 * @swagger
 * /api/author/{id}:
 *   get:
 *     summary: Retrieve a specific author by ID
 *     description: Fetches a single author by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       200:
 *         description: Author details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The author ID.
 *                 name:
 *                   type: string
 *                   description: The author's name.
 *                 biography:
 *                   type: string
 *                   description: The author's biography.
 *       404:
 *         description: Author not found.
 */
router.get("/:id", getAuthorById);

/**
 * @swagger
 * /api/author:
 *   post:
 *     summary: Add a new author
 *     description: Adds a new author to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The author's name.
 *               biography:
 *                 type: string
 *                 description: The author's biography.
 *     responses:
 *       201:
 *         description: Author created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The author ID.
 *                 name:
 *                   type: string
 *                   description: The author's name.
 *                 biography:
 *                   type: string
 *                   description: The author's biography.
 *       400:
 *         description: Invalid input data.
 */
router.post("/", addAuthor);

/**
 * @swagger
 * /api/author/{id}:
 *   put:
 *     summary: Update an existing author
 *     description: Updates an author's details by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The author's name.
 *               biography:
 *                 type: string
 *                 description: The author's biography.
 *     responses:
 *       200:
 *         description: Author updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The author ID.
 *                 name:
 *                   type: string
 *                   description: The author's name.
 *                 biography:
 *                   type: string
 *                   description: The author's biography.
 *       404:
 *         description: Author not found.
 */
router.put("/:id", updateAuthor);

/**
 * @swagger
 * /api/author/{id}:
 *   delete:
 *     summary: Delete an author by ID
 *     description: Deletes an author from the database by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID.
 *     responses:
 *       200:
 *         description: Author deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       404:
 *         description: Author not found.
 */
router.delete("/:id", deleteAuthorById);

module.exports = router;
