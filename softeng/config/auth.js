module.exports = { 
  ensureAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()){
     return next();
    }
    req.flash('error_msg', 'Παρακαλώ συνδεθείτε προτού συνεχίσετε σε αυτή τη σελίδα.');
    res.redirect('/users/login');
  }
}
   
