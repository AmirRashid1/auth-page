const express = require("express");
const app = express();
const path = require("path");
// const router = express.Router();
const bodyParser = require("body-parser"); // add body-parser module

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true })); // use body-parser

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("failure");
});


app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (name === "admin" && password === "admin") {
    res.render("success", {
      username: name,
    });
  } else {
    res.render("failure");
  }

});
app.get("/index2", (req, res) => {
  res.render("index2");
});

app.post("/register", (req, res) => {
  const { name, password } = req.body;
  if (name != "admin" && password != "admin") {
    res.render("register", {
      username: name,
    });
  } else {
    res.render("registered");
  }
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "The about is getting rendered" });
});

// app.use("/", router);
app.listen(process.env.PORT || 4000, () => { 
  console.log("Running at Port 4000");
});
