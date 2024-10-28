const Author = require("../models/authorModel");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Author({
      name: req?.body?.name,
      biography: req?.body?.biography,
    });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(author);
  } catch (error) {
    next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const updateAuthor = await Author.findByIdAndUpdate(
      req?.params?.id,
      {
        name: req?.body?.name,
        biography: req?.body?.biography,
      },
      { new: true }
    );
    if (!updateAuthor) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(updateAuthor);
  } catch (err) {
    next(err);
  }
};

const deleteAuthorById = async (req, res, next) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAuthors,
  addAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthorById,
};
