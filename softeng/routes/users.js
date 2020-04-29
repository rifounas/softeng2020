const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model
const User = require('../models/User');

// Login
router.get('/login', (req, res) => res.render('login'));


// Register
router.get('/register', (req, res) => res.render('register'));

//RegisterHandler
router.post('/register', (req, res) =>  {
  const { name, email, password, password2 }  = req.body;
  let errors = [];

 //checkreqfields
   if(!name || !email || !password || !password2) {
     errors.push({ msg: 'Παρακαλώ συμπληρώστε όλα τα πεδία' });
}
 //check2passmatch
 if(password !== password2) {
  errors.push({ msg: 'Ο κωδικός σας δεν επαληθεύτηκε' });
}
 //passlenght>6
 if(password.length < 6) {
  errors.push({ msg: 'Ο κωδικός πρέπει να αποτελείται από τουλάχιστον 6 χαρακτήρες!' });
}
if(errors.length > 0) {
 res.render('register', {
  errors, 
  name,
  email,
  password,
  password2
  });
}else {
   // after validation
  User.findOne({ email: email })
   .then(user => {
      if(user) {
        errors.push({ msg : 'Υπάρχει ήδη χρήστης με το email αυτό.' });
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
            });
       
          } else {
              const newUser = new User({
                 name,
                 email,
                 password
           });
             
           //hashpswd
      bcrypt.genSalt(10, (err, salt) => 
         bcrypt.hash(newUser.password, salt, (err,hash) => {
             if(err) throw err;
 
newUser.password = hash;
//saveuser
newUser.save()
  .then(user => {
   req.flash('success_msg', 'Ο λογαριασμός σας δημιουργήθηκε με επιτυχία.');
   res.redirect('/users/login');
  })
  .catch(err =>console.log(err));
   }))
             }
});
}
});


//handlelogin
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true

  })(req, res, next);

});



//logout handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Έχετε αποσυνδεθεί επιτυχώς.');
  res.redirect('/users/login');
});


module.exports = router;

