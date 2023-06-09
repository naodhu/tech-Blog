const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// Endpoint to create a new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to log in a user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
    }
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    res.json({ user: userData, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to sign up a user
router.post("/signup", async (req, res) => {
  try {
    const newSignup = await User.create(req.body);
    res.status(200).json(newSignup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Endpoint to log out a user
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
