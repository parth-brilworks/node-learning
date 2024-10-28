const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String, required: false },
});
const Author = mongoose.model("Author", authorSchema);
module.exports = Author;
