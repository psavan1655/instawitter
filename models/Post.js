const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 32,
      required: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      default: "",
    },
    imgPath: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
