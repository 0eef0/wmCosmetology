const path = require('path');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // req.flash('error_message', 'please login to view this resourcenet');
  res.render('pages/login');
}

const ensureAdminAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.user.accountType == 'admin') { return next()};
  res.render('pages/login')
}

module.exports = {
    ensureAuthenticated,
    ensureAdminAuthenticated
}