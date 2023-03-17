// Import the Express Router and the Blog model
const router = require("express").Router();
const { Blog } = require("../../models");

// Import the withAuth middleware for authentication
const withAuth = require("../../utils/auth");

// Create a new blog using a POST request
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new blog using the Blog model and the request body
    // Set the user_id to the current user's id using the session
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // If successful, send a JSON response with the new blog data and a status code of 200
    res.status(200).json(newBlog);
  } catch (err) {
    // If there's an error, send a JSON response with the error message and a status code of 400
    res.status(400).json(err);
  }
});

// Delete a blog using a DELETE request
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the blog where the id matches the request parameter and the user_id matches the session
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no blog is found with the given id and user_id, send a JSON response with an error message and a status code of 404
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    // If successful, send a JSON response with the deleted blog data and a status code of 200
    res.status(200).json(blogData);
  } catch (err) {
    // If there's an error, send a JSON response with the error message and a status code of 500
    res.status(500).json(err);
  }
});

// Export the router for use in other modules
module.exports = router;
