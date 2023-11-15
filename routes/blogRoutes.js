const express = require("express");
const router = express.Router();
const blogs = require("../controller/blogController");

router.get("/", blogs.blog_index);

router.get("/create-blog", blogs.blog_create_get);

router.get("/about", blogs.blog_about);

router.get("/blogs/:id", blogs.blog_single);

// post
router.post("/create-blog", blogs.blog_create_post);

// Delete
router.delete("/blogs/:id", blogs.blog_delete);

module.exports = router;
