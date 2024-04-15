const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
  tite: {
    type: String,
  },
});
const Blog = mongoose.model("blog", BlogSchema);
module.express = { Blog };
