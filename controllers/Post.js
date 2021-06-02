const Post = require("../models/Post");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname.replace(/ /g, ""));
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/svg" ||
    file.mimetype === "image/svg+xml"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid Mime Type, only JPG, JPEG, PNG and SVG allowed"),
      false
    );
  }
};

exports.uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.findPostById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "No Post found in DB",
      });
    }
    //Getting id for frontend
    req.post = post;
    next();
  });
};

exports.createPost = (req, res) => {
  req.body.imgPath = req.file.path;
  const post = new Post(req.body);
  post.save((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save post in DB",
      });
    }
    res.json(post);
  });
};

exports.getPost = (req, res) => {
  return res.json(req.post);
};

exports.getAllPosts = (req, res) => {
  Post.find().exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "No post found in DB",
      });
    }
    res.json(post);
  });
};

exports.updatePost = (req, res) => {
  const postData = req.post;
  if (req.body.title) {
    postData.title = req.body.title;
  }
  if (req.body.caption) {
    postData.caption = req.body.caption;
  }
  console.log(postData);
  postData.save((err, updatedpost) => {
    if (err) {
      return res.status(400).json({
        error: "Post not Updated",
      });
    }
    res.json(updatedpost);
  });
};

exports.deletePost = (req, res) => {
  const post = req.post;
  post.remove((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "post not deleted successfully",
      });
    }
    res.json({
      message: `Successfully deleted ${post} post`,
    });
  });
};
