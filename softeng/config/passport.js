const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load user
const User = require('../models/User');

module.exports= function(passport){
 passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    //finduserindb
     User.findOne({ email: email })
       .then(user =>{
        if(!user) {
          return done(null, false, { message:'Αυτός ο λογαριασμός δεν υπάρχει.' });
        }
         
        //Matchpswd
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if(err) throw err; 
 
            if(isMatch) {
              return done(null, user);
            } else {
                return done(null, false, { message: 'Ο κωδικός πρόσβασης είναι λάθος.' }); 
              }


        });

       })
       .catch(err => console.log(err));
})
);


passport.serializeUser((user, done) =>  {
  done(null, user.id);
});

passport.deserializeUser((id, done) =>  {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});




}
