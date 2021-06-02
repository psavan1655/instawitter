const express = require("express");
const router = express.Router();

const {
  findPostById,
  createPost,
  uploadImage,
  getPost,
  updatePost,
  deletePost,
  getAllPosts,
  //   getAllUniqueComments,
} = require("../controllers/Post");
const {
  findUserById,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/Auth");

//Params - Done
router.param("userId", findUserById);
router.param("postId", findPostById);

//Create Routes - Done
router.post(
  "/post/create/:userId",
  isSignedIn,
  isAuthenticated,
  uploadImage.single("imgPath"),
  createPost
);
// TODO: Create route for likes

//Read Routes - Done
router.get("/post/:postId", isSignedIn, getPost);
router.get("/posts", isSignedIn, getAllPosts);

//Update Routes
router.put("/post/:postId/:userId", isSignedIn, isAuthenticated, updatePost);
// TODO: Create route for updating like

//Delete Routes
router.delete("/post/:postId/:userId", isSignedIn, isAuthenticated, deletePost);

//post Listing Routes

//Category Listing Routes
// router.get("/posts/comments", getAllUniqueComments);

module.exports = router;
