require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var compression = require("compression");

//MyRoutes
const authRoutes = require("./routes/Auth");
const tweetRoutes = require("./routes/Tweet");
const commentRoutes = require("./routes/Comment");
const postRoutes = require("./routes/Post");
// const orderRoutes = require("./routes/order");
// const stripeRoutes = require("./routes/stripepayment");

const app = express();

//DB Connectivity
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Middlewares
app.use(bodyParser.json());
app.use("/api/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(cors());
app.use(compression());
// app.use(express.static(path.join(__dirname, "client", "build")));

//My Routes with middleware
app.use("/api", authRoutes);
app.use("/api", tweetRoutes);
app.use("/api", commentRoutes);
app.use("/api", postRoutes);

//Production:
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

//Ports
const PORT = process.env.PORT || 8000;

//Starting a server
app.listen(PORT, () => {
  console.log(`App is runnning on ${PORT}`);
});

//Project completed
