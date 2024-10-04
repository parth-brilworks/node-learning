const path = require("path");
const fs = require("fs");
const authorsFilePath = path.join(__dirname, "../data/authors.json");

const handleReadAuthors = () => {
  if (!fs.existsSync(authorsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(authorsFilePath, "utf-8");
  return JSON.parse(data);
};

const handleSaveAuthors = (authors) =>
  fs.writeFileSync(authorsFilePath, JSON.stringify(authors));

const getAllAuthors = (req, res, next) => {
  try {
    const authors = handleReadAuthors();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const addAuthor = (req, res, next) => {
  try {
    const authors = handleReadAuthors();
    const newAuthor = {
      id: authors?.length + 1 || 1,
      name: req?.body?.name,
      biography: req?.body?.biography,
    };
    authors.push(newAuthor);
    handleSaveAuthors(authors);
    res.status(201).json(newAuthor);
  } catch (err) {
    next(err);
  }
};

const getAuthorById = (req, res, next) => {
  try {
    const authors = handleReadAuthors();
    const matchedAuthor = authors.find(
      (a) => a.id === parseInt(req?.params?.id)
    );
    if (!matchedAuthor) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      return next(error);
    }
    res.json(matchedAuthor);
  } catch (error) {
    next(error);
  }
};

const updateAuthor = (req, res, next) => {
  try {
    const authors = handleReadAuthors();
    const authorIndex = authors.findIndex(
      (a) => a.id === parseInt(req?.params?.id)
    );
    if (authorIndex === -1) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      return next(error);
    }
    authors[authorIndex] = {
      ...authors[authorIndex],
      name: req?.body?.name || authors[authorIndex].name,
      biography: req?.body?.biography || authors[authorIndex].biography,
    };
    handleSaveAuthors(authors);
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const deleteAuthorById = (req, res, next) => {
  try {
    const authors = handleReadAuthors();
    const authorIndex = authors.findIndex(
      (a) => a.id === parseInt(req?.params?.id)
    );
    if (authorIndex === -1) {
      const error = new Error("Author not found");
      error.statusCode = 404;
      return next(error);
    }
    authors.splice(authorIndex, 1);
    handleSaveAuthors(authors);
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
