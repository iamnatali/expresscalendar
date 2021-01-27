var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require("body-parser");
/*enables https*/
var https = require( "https" );
/*enables https*/ 
var fs = require( "fs" ); 

var indexRouter = require('./routes/index');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/calendardb';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var User = require(".\\models\\user.js");
var Event = require(".\\models\\event.js");

function handleError(err){
  console.log(err);
}

var app = express();

/*enables https*/
httpsOptions = {
  key: fs.readFileSync(__dirname + "\\server.key"), // путь к ключу
  cert: fs.readFileSync(__dirname + "\\server.cert") // путь к сертификату
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/

app.use('/', indexRouter);


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ name: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.password === password)/*!user.validPassword(password)*/) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

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

/*enables https*/
https.createServer(httpsOptions, app).listen(443);

module.exports = app;
