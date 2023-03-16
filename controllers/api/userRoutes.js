// Import required modules
const router = require('express').Router();
const { User } = require('../../models');

// Endpoint to create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided data
    const userData = await User.create(req.body);

    // Save user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Send response with the new user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // Send error response if something goes wrong
    res.status(400).json(err);
  }
});

// Endpoint to log in a user
router.post('/login', async (req, res) => {
  try {
    // Find a user with the provided username
    const userData = await User.findOne({ where: { username: req.body.username } });

    // If no user is found, send error response
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Check if the provided password matches the user's password
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is invalid, send error response
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Save user's session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      // Send response with the logged in user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Send error response if something goes wrong
    res.status(400).json(err);
  }
});

// Endpoint to sign up a user
router.post('/signup', async (req, res) => {
  try {
    // Create a new user with the provided data
    const newSignup = await User.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Send response with the new user data
    res.status(200).json(newSignup);
  } catch (err) {
    // Send error response if something goes wrong
    res.status(400).json(err);
  }
});

// Endpoint to log out a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy user's session data and send successful response
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // Send error response if user is not logged in
    res.status(404).end();
  }
});

// Export router for use in other files
module.exports = router;
