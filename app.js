const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./model/blog");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

// Middleware
app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to database
const dbURI =
  "mongodb+srv://john:doe@cluster0.ky23eex.mongodb.net/blog-post?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(3000, () => console.log("Listening on PORT 3000"));
  })
  .catch((err) => console.log("Connection fail!"));

// Routes
app.get("/", (req, res) => {
  Blog.find()
    .then((result) =>
      res.render("index", { title: "Home", activeLink: "home", blogs: result })
    )
    .catch((err) => console.log(err));
});

app.get("/create-blog", (req, res) => {
  res.render("create", { title: "Create Blog", activeLink: "create-blog" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", activeLink: "about" });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", {
        title: "Blog Details",
        activeLink: "home",
        details: result,
      });
    })

    .catch((err) => {
      res.end();
      console.log(err);
    });
});

// post
app.post("/create-blog", (req, res) => {
  const params = req.body;
  const blog = new Blog(params);

  blog
    .save()
    .then(() => {
      console.log("New Blog Added!");
      res.redirect("/");
    })
    .catch((err) => console.log("Error", err.message));
});

// Delete
app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(() => {
      console.log("Succesfully Deleted");
      res.json({ redirect: "/" });
    })
    .catch((err) => res.end());
});

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404", activeLink: "" });
});
