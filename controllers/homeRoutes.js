const express = require("express");
const router = express.Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Homepage route
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Blog route
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [User] },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("blog", { ...blog, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// Signup route
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

module.exports = router;
