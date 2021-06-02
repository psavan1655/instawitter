const express = require("express");
const router = express.Router();

const {
  findTweetById,
  createTweet,
  getTweet,
  updateTweet,
  deleteTweet,
  getAllTweets,
  //   getAllUniqueComments,
} = require("../controllers/Tweet");
const {
  findUserById,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/Auth");

//Params
router.param("userId", findUserById);
router.param("tweetId", findTweetById);

//Create Routes
router.post("/tweet/create/:userId", isSignedIn, isAuthenticated, createTweet);
// TODO: Create route for likes

//Read Routes
router.get("/tweet/:tweetId", isSignedIn, getTweet);

//Update Routes
router.put("/tweet/:tweetId/:userId", isSignedIn, isAuthenticated, updateTweet);
// TODO: Create route for updating like

//Delete Routes
router.delete(
  "/tweet/:tweetId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteTweet
);

//tweet Listing Routes
router.get("/tweets", isSignedIn, getAllTweets);

//Category Listing Routes
// router.get("/tweets/comments", getAllUniqueComments);

module.exports = router;
