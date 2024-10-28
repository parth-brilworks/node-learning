const express = require("express");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../controllers/categoryController");

const router = express.Router();

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Retrieve a list of all categories
 *     description: Fetches all categories from the database.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The category ID.
 *                   name:
 *                     type: string
 *                     description: The name of the category.
 *                   description:
 *                     type: string
 *                     description: Details about the category.
 */
router.get("/", getAllCategories);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Add a new category
 *     description: Creates a new category with a name and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *               description:
 *                 type: string
 *                 description: Details about the category.
 *     responses:
 *       201:
 *         description: Category created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The category ID.
 *                 name:
 *                   type: string
 *                   description: The name of the category.
 *                 description:
 *                   type: string
 *                   description: Details about the category.
 */
router.post("/", addCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Retrieve a category by ID
 *     description: Fetches a single category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID.
 *     responses:
 *       200:
 *         description: Category details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The category ID.
 *                 name:
 *                   type: string
 *                   description: The name of the category.
 *                 description:
 *                   type: string
 *                   description: Details about the category.
 *       404:
 *         description: Category not found.
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Updates an existing category's details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the category.
 *               description:
 *                 type: string
 *                 description: The updated details about the category.
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The category ID.
 *                 name:
 *                   type: string
 *                   description: The updated name of the category.
 *                 description:
 *                   type: string
 *                   description: The updated details about the category.
 *       404:
 *         description: Category not found.
 */
router.put("/:id", updateCategory);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Deletes a category from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID.
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       404:
 *         description: Category not found.
 */
router.delete("/:id", deleteCategoryById);

module.exports = router;
