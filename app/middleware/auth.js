// middleware/auth.js
const passport = require('passport');

const authenticate = (req, res, next) => {
  // Use the JWT strategy for authentication
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      // If authentication fails, send a 401 Unauthorized response
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      // If authentication succeeds, allow access to the next middleware or route handler
      req.user = user;
      next();
    }
  })(req, res, next);
};

module.exports = authenticate;
