const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
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



app.post("/login", (req, res) => {
  const { name, password } = req.body;
  const registeredUsers = require("./users.json");
  const foundUser = registeredUsers.find(user => user.name === name && user.password === password);
  if (foundUser) {
    res.render("login-successfully", {
      username: foundUser.name,
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
  const registeredUsers = require("./users.json");
  const foundUser = registeredUsers.find(user => user.name === name);
  if (foundUser) {
    res.render("user-already-registered");
  } else {
    const newUser = { name, password };
    registeredUsers.push(newUser);
    fs.writeFile("users.json", JSON.stringify(registeredUsers), (err) => {
      if (err) throw err;
      console.log("Registered users saved to users.json");
    });
    res.render("registration-successfully", {
      username: name,
    });
  }
});


app.get("/registration-successfully", (req, res) => {
  const { username } = req.query;
  res.render("registration-successfully", {
    username,
  });
});


app.get("/about", (req, res) => {
  res.render("about", { title: "About", message: "The about is getting rendered" });
});


app.listen(process.env.PORT || 4000, () => { 
  console.log("Running at Port 4000");
});
