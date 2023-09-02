const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (/*!req.session.logged_in*/ true) {  // TODO - change this back!!!
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  