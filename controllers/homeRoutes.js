const router = require('express').Router();
const { Blog, User, Comment } = require('../models'); // import models
const withAuth = require('../utils/auth'); // import middleware for authentication

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Blog route
router.get('/blog/:id', async (req, res) => {
  try {
    // Find blog by ID and JOIN with user and comment data
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        }, {
          model: Comment,
          include: [
            User
          ]
        }
      ],
    });

    // Serialize data so the template can read it
    const blog = blogData.get({ plain: true });
    
    // Render the blog template with the serialized data and session flag
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile route, uses authentication middleware
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID and JOIN with blog data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    // Serialize data so the template can read it
    const user = userData.get({ plain: true });

    // Render the profile template with the serialized data and session flag
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the login template
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the signup template
  res.render('signup');
});

module.exports = router; // Export the router to be used in other files
