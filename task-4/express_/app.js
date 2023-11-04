var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var booksRouter = require("./routes/books");
var authorsRouter = require("./routes/author");

var app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb");

app.listen(5000);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", usersRouter);
app.use("/api/login", authRouter);
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);

const User = require("./schemas/book");

/*// POST
app.post("/book", async (req, res) => {
  const { login, password, email } = req.body;
  console.log(req.body);

  let newUser = new User({ login: login, password: password, email: email });

  try {
    newUser = await newUser.save();
    res.status(200).send("Success");
  } catch (e) {
    res.status(400).send(e);
  }
  console.log(newUser);
});

// GET BY ID
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  let user = await User.findById(id);

  console.log(user);
  res.status(200).send(user);
});

// auth
app.post("/auth", async (req, res) => {
  const { login, password } = req.body;

  let user = await User.find({ login, password });
  console.log(user);
  // user.token = Math.random().toString(36).substring(2,7);
  // user = await user.save();

  if (user.length > 0) {
    // next();
    res.status(200).send("OKokok");
  } else {
    res.status(403).send("Access denied");
  }

  console.log(user);
});

// GET ALL ENTRIES
app.post("/users", auth, async (req, res) => {
  let user = await User.find();

  // console.log(user);
  res.status(200).send(user);
});

// PUT
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { login, password, email } = req.body;

  let user = await User.findById(id);
  user.login = login;
  user.password = password;
  user.email = email;

  try {
    user = await user.save();
    res.status(200).send("Success");
  } catch (e) {
    res.status(400).send(e);
  }
  console.log(user);
});

// DELETE
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  let user = await User.deleteOne({ _id: id });

  res.status(200).send(user);
});*/

// EJS static page
app.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
