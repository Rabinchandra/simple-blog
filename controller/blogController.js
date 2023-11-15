const Blog = require("../model/blog");

const blog_index = (req, res) => {
  Blog.find()
    .then((result) =>
      res.render("index", { title: "Home", activeLink: "home", blogs: result })
    )
    .catch((err) => console.log(err));
};

const blog_create_get = (req, res) => {
  res.render("create", { title: "Create Blog", activeLink: "create-blog" });
};

const blog_about = (req, res) => {
  res.render("about", { title: "About", activeLink: "about" });
};

const blog_single = (req, res) => {
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
};

const blog_create_post = (req, res) => {
  const params = req.body;
  const blog = new Blog(params);

  blog
    .save()
    .then(() => {
      console.log("New Blog Added!");
      res.redirect("/");
    })
    .catch((err) => console.log("Error", err.message));
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(() => {
      console.log("Succesfully Deleted");
      res.json({ redirect: "/" });
    })
    .catch((err) => res.end());
};

module.exports = {
  blog_index,
  blog_create_get,
  blog_about,
  blog_single,
  blog_create_post,
  blog_delete,
};
