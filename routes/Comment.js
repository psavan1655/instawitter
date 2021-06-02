const express = require("express");
const router = express.Router();

const {
  findCommentById,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getAllComments,
} = require("../controllers/Comment");
const { findTweetById } = require("../controllers/Tweet");
const {
  findUserById,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/Auth");

//Params
router.param("userId", findUserById);
router.param("tweetId", findTweetById);
router.param("commentId", findCommentById);

//Create Routes
router.post(
  "/comment/create/:tweetId/:userId",
  isSignedIn,
  isAuthenticated,
  createComment
);

//Read Routes
router.get("/comment/:commentId", isSignedIn, getComment);

//Update Routes
router.put(
  "/comment/:commentId/:userId",
  isSignedIn,
  isAuthenticated,
  updateComment
);

//Delete Routes
router.delete(
  "/comment/:commentId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteComment
);

//Comment Listing Routes
router.get("/comments/:tweetId", isSignedIn, getAllComments);
// router.get("/comments/:postId", isSignedIn, getAllComments); TODO:

// TODO: Get route to get all comments for specific user

module.exports = router;
