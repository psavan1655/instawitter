const Tweet = require("../models/Tweet");

exports.findTweetById = (req, res, next, id) => {
  Tweet.findById(id).exec((err, tweet) => {
    if (err) {
      return res.status(400).json({
        error: "No tweet found in DB",
      });
    }
    //Getting id for frontend
    req.tweet = tweet;
    next();
  });
};

exports.createTweet = (req, res) => {
  const tweet = new Tweet(req.body);
  tweet.save((err, tweet) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save tweet in DB",
      });
    }
    res.json(tweet);
  });
};

exports.getTweet = (req, res) => {
  return res.json(req.tweet);
};

exports.getAllTweets = (req, res) => {
  Tweet.find().exec((err, tweet) => {
    if (err) {
      return res.status(400).json({
        error: "No tweet found in DB",
      });
    }
    res.json(tweet);
  });
};

exports.updateTweet = (req, res) => {
  const tweet = req.tweet;
  tweet.content = req.body.content;

  tweet.save((err, updatedTweet) => {
    if (err) {
      return res.status(400).json({
        error: "Tweet not Updated",
      });
    }
    res.json(updatedTweet);
  });
};

exports.deleteTweet = (req, res) => {
  const tweet = req.tweet;
  tweet.remove((err, tweet) => {
    if (err) {
      return res.status(400).json({
        error: "Tweet not deleted successfully",
      });
    }
    res.json({
      message: `Successfully deleted ${tweet} tweet`,
    });
  });
};
