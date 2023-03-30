const express = require("express");
const app = express();
const path = require("path");
// const router = express.Router();
const bodyParser = require("body-parser"); // add body-parser module

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true })); // use body-parser

app.get("/", (req, res) => {
  res.render("login-page");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/index", (req, res) => {
  res.render("failure");
});


app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("registration-successfully", {
      username: name,
    });
  } else {
    res.render("login-failure");
  }

});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { name, password } = req.body;
  if (name != "admin" && password != "admin") {
    res.render("register", {
      username: name,
    });
  } else {
    res.render("user-already-registered");
  }
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "The about is getting rendered" });
});

// app.use("/", router);
app.listen(process.env.PORT || 4000, () => { 
  console.log("Running at Port 4000");
});
