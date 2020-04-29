
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require ('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

//passport config
require('./config/passport')(passport);

//DB COnfiguration
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
   .then(() => console.log(' Succesfully connected to database.'))
   .catch(err => console.log(err));



//ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');


//Bodyparser
app.use(express.urlencoded({ extended: false }));


// express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized :true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());


//global variables
app.use((req, res, next) =>{
 res.locals.success_msg = req.flash('success_msg');
 res.locals.error_msg = req.flash('error_msg');
 res.locals.error = req.flash('error');
 next();
});



// routes
app.use ('/', require('./routes/index'));
app.use ('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server starts on port ${PORT}`));
