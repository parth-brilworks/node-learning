const Category = require("../models/categoryModel");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
};
const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

const deleteCategoryById = async (req, res, next) => {
  try {
    const categoryDeleted = await Category.findByIdAndDelete(req.params.id);
    if (!categoryDeleted) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
};
