const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    following: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
