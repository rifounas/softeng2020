const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

//WElcome page
router.get('/', (req, res) => res.render('welcome'));

//dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
   res.render('dashboard',{
   name: req.user.name
}));

router.get('/soon', ensureAuthenticated, (req, res) =>
   res.render('soon',{
   name: req.user.name
}));


module.exports = router;
