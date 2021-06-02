const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: 400,
      trim: true,
      default: "",
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

module.exports = mongoose.model("Tweet", tweetSchema);
