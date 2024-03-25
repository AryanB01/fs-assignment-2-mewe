var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexController = require('./controller/index');
var usersController = require('./controller/users');
var postsController = require('./controller/posts');
var authController  = require('./controller/auth');

// custom imports
let mongoose = require('mongoose');
let dotenv = require('dotenv');
let passport = require('passport');
let session = require('express-session');


var app = express();

// db conn
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.CONNECTION_STRING, {})
.then((res) => { console.log ('Connected to MongoDB'); })
.catch((err) => { console.log (`DB Connection Failed ${err}`); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configuring session support
app.use(session({
  secret: 'process.env.PASSPORT_SECRET',
  resave: true,
  saveUninitialized: false
}));

//enabling passport with session
app.use(passport.initialize());
app.use(passport.session());

//linking passport to user model and local strategy
let User = require ('./models/user');
passport.use(User.createStrategy());

// enabling session reads /writes for passport users 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexController);
app.use('/users', usersController);
app.use('/posts', postsController)
app.use('/auth', authController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
