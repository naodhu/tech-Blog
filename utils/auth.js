// This middleware function checks whether the user is authenticated by verifying the `logged_in` property of the `req.session` object.
// If the user is not authenticated, it redirects the request to the login route. Otherwise, it calls the next middleware function in the chain.
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
