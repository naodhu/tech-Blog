// Import the required dependencies and routes
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Use homeRoutes for the root route
router.use("/", homeRoutes);

// Use apiRoutes for /api routes
router.use("/api", apiRoutes);

// Export the router for use in other modules
module.exports = router;
