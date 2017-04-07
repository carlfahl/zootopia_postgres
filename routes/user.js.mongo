var express = require('express');
var passport = require('passport');
var User = require('../models/user');

var router = express.Router();

router.use(function (req, res, next) {
  console.log("Using the user auth router");
  next();
});

router.route('/')
  .get(function (req, res) {
    res.render('Profile', {});
  });

router.route('/login')
  .get(function (req, res) {
    res.render('login', {});
  })
  .post(
    // var userName = req.body.userName;
    // var password = req.body.password;
    passport.authenticate('local', { failureRedirect: '/users/login' }),
      function(req, res) {
        res.json({'message': 'Logged in!!!!'});
        // res.redirect('/users');
    });

router.route('/addnew')
  .get(function (req, res) {
    User.find(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  })
  .post(function (req, res) {
    var user = new User();
    user.local.username = req.body.username;
    user.local.password = req.body.password;
    user.save(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.json(data);
      }
    });
  });

  module.exports = router;
