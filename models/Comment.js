const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      default: "",
    },
    post: {
      type: ObjectId,
      ref: "Post",
    },
    tweet: {
      type: ObjectId,
      ref: "Tweet",
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
