const Comment = require("../models/Comment");

exports.findCommentById = (req, res, next, id) => {
  Comment.findById(id).exec((err, comment) => {
    if (err) {
      return res.status(400).json({
        error: "No comment found in DB",
      });
    }
    //Getting id for frontend
    req.comment = comment;
    next();
  });
};

exports.createComment = (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save comment in DB",
      });
    }
    res.json(comment);
  });
};

exports.getComment = (req, res) => {
  return res.json(req.comment);
};

// Get all comments on basis of parmas received. Either tweetId or postId
exports.getAllComments = (req, res) => {
  if (req.params.tweetId) {
    Comment.find({ tweet: req.params.tweetId }).exec((err, comment) => {
      if (err) {
        return res.status(400).json({
          error: "No comment found in DB",
        });
      }
      res.json(comment);
    });
  }
  if (req.params.postId) {
    Comment.find({ post: req.params.postId }).exec((err, comment) => {
      if (err) {
        return res.status(400).json({
          error: "No comment found in DB",
        });
      }
      res.json(comment);
    });
  }
};

exports.updateComment = (req, res) => {
  const commentData = req.comment;
  commentData.comment = req.body.comment;

  commentData.save((err, updatedcomment) => {
    if (err) {
      return res.status(400).json({
        error: "comment not Updated",
      });
    }
    res.json(updatedcomment);
  });
};

exports.deleteComment = (req, res) => {
  const commentData = req.comment;
  commentData.remove((err, comment) => {
    if (err) {
      return res.status(400).json({
        error: "comment not deleted successfully",
      });
    }
    res.json({
      message: `Successfully deleted ${comment} comment`,
    });
  });
};
