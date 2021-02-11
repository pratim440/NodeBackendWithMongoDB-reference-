const express = require("express");
const bodyParser = require("body-parser");
require("./db/conn");
const User = require("./models/user");

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.get("/", async (req, res) => {
  // const allUser = await User.find();
  // res.json(allUser);
  res.render("index", { name: "rittik", mobile: 2323 });
  console.log(process.env.SECRET);
});

app.post("/add", async (req, res) => {
  try {
    const addUser = new User({
      name: req.body.name,
      mobile: req.body.mobile,
    });
    await addUser.save();
    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(401).redirect("/");
  }
});

app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, {
      name: req.body.name,
      mobile: req.body.mobile,
    });
    res.status(200).send("User updated successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log("Server started successfully");
});
