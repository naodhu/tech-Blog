// Importing the required modules for routing.
const router = require('express').Router();
const userRoutes = require('./userRoutes'); // Importing userRoutes module
const blogRoutes = require('./blogRoutes'); // Importing blogRoutes module
const commentRoutes = require('./commentRoute'); // Importing commentRoutes module

// Defining the routes for each module.
router.use('/users', userRoutes); // For users
router.use('/blogs', blogRoutes); // For blogs
router.use('/comments', commentRoutes); // For comments

// Exporting the router for use in the main application.
module.exports = router;