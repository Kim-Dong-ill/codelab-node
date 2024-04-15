const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    bookName: {
      type: String,
      require: true,
    },
    page: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookSchema);

module.exports = { Book };
