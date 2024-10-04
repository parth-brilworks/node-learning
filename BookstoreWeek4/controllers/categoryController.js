const path = require("path");
const fs = require("fs");
const categoryFilePath = path.join(__dirname, "../data/categories.json");

const handleReadCategories = () => {
  if (!fs.existsSync(categoryFilePath)) {
    return [];
  }
  const data = fs.readFileSync(categoryFilePath, "utf-8");
  return JSON.parse(data);
};

const handleSaveCategories = (categories) =>
  fs.writeFileSync(categoryFilePath, JSON.stringify(categories));

const getAllCategories = (req, res, next) => {
  try {
    const categories = handleReadCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const addCategory = (req, res, next) => {
  try {
    const categories = handleReadCategories();
    const newCategory = {
      id: categories.length + 1 || 1,
      name: req.body.name,
      description: req.body.description,
    };
    categories.push(newCategory);
    handleSaveCategories(categories);
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = (req, res, next) => {
  try {
    const categories = handleReadCategories();
    const matchedCategory = categories.find(
      (a) => a.id === parseInt(req.params.id)
    );
    if (!matchedCategory) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(matchedCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = (req, res, next) => {
  try {
    const categories = handleReadCategories();
    const categoryIndex = categories.findIndex(
      (a) => a.id === parseInt(req.params.id)
    );
    if (categoryIndex === -1) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    categories[categoryIndex] = {
      ...categories[categoryIndex],
      name: req.body.name || categories[categoryIndex].name,
      description:
        req.body.description || categories[categoryIndex].description,
    };
    handleSaveCategories(categories);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const deleteCategoryById = (req, res, next) => {
  try {
    const categories = handleReadCategories();
    const categoryIndex = categories.findIndex(
      (a) => a.id === parseInt(req.params.id)
    );
    if (categoryIndex === -1) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    categories.splice(categoryIndex, 1);
    handleSaveCategories(categories);
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
};
