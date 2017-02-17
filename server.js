var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user.js')

mongoose.connect("mongodb://localhost/zootopia");

// passport.use(new Strategy(
passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.find({'local.username': username}, function(err, user) {
      if (err) {
        return done(err);
      } if (!user) {
        return done(null, false);
      }
      console.log(user);
      if (user[0].local.password != password) {
        return cb(null, false);
      }
      return done(null, user);
    });
  }));

var animalRoutes = require('./routes/animals');
var userRoutes = require('./routes/users');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json

// initialize the passport authentication.
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.send({message: "It's alive!!!"});
});

app.use('/api/animals', animalRoutes);
app.use('/users', userRoutes);

app.listen(app.get('port'), function(){
  console.log(`🔥🔥🔥🔥🔥🔥 at: http://localhost:${app.get('port')}/`);
});
