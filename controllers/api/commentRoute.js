// Import the Express Router and the Comment model
const router = require("express").Router();
const { Comment } = require("../../models");

// Import the withAuth middleware for authentication
const withAuth = require("../../utils/auth");

// Find all comments using a GET request
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find a specific comment by id using a GET request
router.get("/:id", (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new comment using a POST request
router.post("/", async (req, res) => {
  try {
    // Create a new comment using the Comment model and the request body
    // Set the userId to the current user's id using the session
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    // If successful, send a JSON response with the new comment data
    res.json(newComment);
  } catch (err) {
    // If there's an error, send a JSON response with the error message and a status code of 500
    res.status(500).json(err);
  }
});

// Delete a comment using a DELETE request
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the comment where the id matches the request parameter and the user_id matches the session
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // If no comment is found with the given id and user_id, send a JSON response with an error message and a status code of 404
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
    // If successful, send a JSON response with the deleted comment data and a status code of 200
    res.status(200).json(commentData);
  } catch (err) {
    // If there's an error, send a JSON response with the error message and a status code of 500
    res.status(500).json(err);
  }
});

// Export the router for use in other modules
module.exports = router;
