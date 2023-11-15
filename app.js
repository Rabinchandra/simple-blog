const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

app.set("view engine", "ejs");

// Middleware
app.use(express.static("public", { root: __dirname }));
app.use(express.urlencoded({ extended: true }));

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
app.use(blogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("404", { title: "404", activeLink: "" });
});
