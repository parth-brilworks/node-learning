const express = require("express");
const {
  addAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthorById,
} = require("../controllers/authorControllers");
const { authorSchema, validate } = require("../middlewares/validateBook");

const router = express.Router();

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.post("/", validate(authorSchema), addAuthor);

router.put("/:id", validate(authorSchema), updateAuthor);

router.delete("/:id", deleteAuthorById);

module.exports = router;
