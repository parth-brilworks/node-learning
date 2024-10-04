const express = require("express");
const {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} = require("../controllers/categoryController");
const { categorySchema, validate } = require("../middlewares/validateBook");

const router = express.Router();

router.get("/", getAllCategories);

router.post("/", validate(categorySchema), addCategory);

router.get("/:id", getCategoryById);

router.put("/:id", validate(categorySchema), updateCategory);

router.delete("/:id", deleteCategoryById);

module.exports = router;
