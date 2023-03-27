const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: String,
    no_if_comments: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("Post", PostSchema);

module.exports = { PostModel };
