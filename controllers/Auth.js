const User = require("../models/User");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
var expressJwt = require("express-jwt");
const nodemailer = require("nodemailer");

// Params - Done
exports.findUserById = (req, res, next, id) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }
    if (user) {
      req.profile = user;
      next();
    }
  });
};

// Signup Controller - Done
exports.signup = async (req, res, next) => {
  const data = req.body;
  try {
    User.findOne({ email: req.body.email }, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Error",
        });
      }
      if (data) {
        return res.status(400).json({
          error: "Email Already exists",
        });
      }
    });
    const password = data["password"];
    const saltRounds = 11;
    const securePassword = await bcrypt.hash(password, saltRounds);
    data["password"] = securePassword;
    const user = new User(data);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          err: "Not able to save the user info in DB",
        });
      }
      // next();
      return res.json({
        id: user._id,
        firstname: user.firstname,
        email: user.email,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Signin Controller - Done
exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        err: "USER email does not exists",
      });
    }
    if (!bcrypt.compare(password, user["password"])) {
      return res.status(401).json({
        err: "Email and password do not match",
      });
    }
    //create token for cookie
    const token = jwt.sign({ _id: user.id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, firstname, email, role } = user;

    return res.json({ token, user: { _id, firstname, email, role } });
    //TODO: res.redirect("/"); Add this res after postman testing complete.
  }).catch((err) => {
    console.log(err);
  });
};

// SignOut Controller - Done
exports.signout = (req, res, next) => {
  res.clearCookie("token");
  res.json({
    msg: "User signed out successfully",
  });
};

//Protected Routes - Done
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

//Custom middleware - Done
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile.id === req.auth._id;
  if (!checker) {
    res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

// Admin Role Routes - Done
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Sorry, you do not have Admin previliges",
    });
  }
  next();
};

// Get All Users data - Done
exports.getAllUsers = async (req, res, next) => {
  try {
    const userData = await User.find();

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// Get one user Routes - Done
exports.getUser = (req, res) => {
  req.profile.password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// TODO:
exports.deleteUserById = async (req, res) => {
  try {
    const userData = await User.deleteOne({ _id: req.params.userId });
    res.json({ todoData });
  } catch (err) {
    return res.status(400).json({
      error: "Todo not deleted",
    });
  }
};

// Update User Route - Done
exports.updateUser = async (req, res) => {
  try {
    const userData = req.profile;
    if (req.body.firstname) {
      userData.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      userData.lastname = req.body.lastname;
    }
    if (req.body.email) {
      userData.email = req.body.email;
    }
    if (req.body.bio) {
      userData.bio = req.body.bio;
    }
    if (req.body.password) {
      userData.password = req.body.password;
    }

    await userData.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "User not updated",
        });
      }
      res.json(userData);
    });
  } catch (error) {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
};

// Update user role by Admin only - Done
exports.updateUserRoleByAdmin = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.userId });
    if (req.body.role) {
      userData.role = req.body.role;
    }

    await userData.save((err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Role not updated",
        });
      }
      res.json(userData);
    });
  } catch (error) {
    res.status(404);
    res.send({ error: "ACCESS DENIED" });
  }
};

// exports.confirmationMail = async (req, res) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "savan.gatesaniya@gmail.com", // generated ethereal user
//         pass: process.env.PASSWORD, // generated ethereal password
//       },
//     });

//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: "savan.gatesaniya@gmail.com", // sender address
//       to: req.body.email, // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
//     return res.json({
//       id: req.body._id,
//       name: req.body.name,
//       email: req.body.email,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error,
//     });
//   }
// };
