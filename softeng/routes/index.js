const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.get('/', (req, res) => res.render('welcome'));


router.get('/dashboard', ensureAuthenticated, (req, res) => 
   res.render('dashboard',{
   name: req.user.name
}));

router.get('/rating', ensureAuthenticated, (req, res) =>
   res.render('rating',{
   name: req.user.name
}));

router.get('/search', ensureAuthenticated, (req, res) =>
   res.render('search',{
   name: req.user.name
}));

router.get('/history', ensureAuthenticated, (req, res) =>
   res.render('history',{
   name: req.user.name
}));

router.get('/results', ensureAuthenticated, (req, res) =>
   res.render('results',{
   name: req.user.name
}));

router.get('/thanks', ensureAuthenticated, (req, res) =>
   res.render('thanks',{
   name: req.user.name
}));


module.exports = router;
