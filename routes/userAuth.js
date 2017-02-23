var User = require('../models/user');
var Location = require('../models/location');

module.exports = function (app, passport) {
  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) {
        console.log("Error with authentication.");
        return next(err);
      }
      if (!user) {
        console.log("No User found.");
        return res.json(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json(user);
      })
    })(req, res, next);
  });

  app.post('/signup', function (req, res, next) {
    console.log('doing signup');
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        console.log('In first error');
        res.json({message: "Database Error"});
        return next(err);
      } else {
        if (!user) {
          console.log("Email already taken error");
          res.json({message: "That email is already taken"});
          return next()
        } else {
          res.json(user);
        }
      }
    })(req, res, next);
  });

  app.get('/getCurrentUser', function (req, res) {
    if(req.user) {
      User.findById(req.user._id)
        .populate('location')
        .exec(function (err, data) {
          console.log(data);
          if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
        });
    } else {
      res.json({user: null})
    }
  });

  app.post('/update', isLogedIn, function (req, res) {
    User.findById(req.user._id, function (err, user) {
      if (err) {
        req.flash('updateMessage', 'Update Failed: Failed to Lookup User.');
        res.redirect('/profile');
        console.log(err);
      } else {
        var location = new Location();
        location.city = req.body.city;
        location.state = req.body.state;
        location.zip = req.body.zip;
        location.save(function (err, location) {
          if (err) {
            console.log(err);
            req.flash('updateMessage', 'Update Failed: Failed to Save Location.');
            res.redirect('/profile');
          }
          user.location = location._id;
          user.save(function (err, data) {
            if (err) {
              console.log(err);
              req.flash('updateMessage', 'Update Failed: Failed to Save the User.');
              res.redirect('/profile');
            }
            req.flash('updateMessage', 'Updated User.')
            res.redirect('/profile');
          });
        });
      }
    });
  });

  function isLogedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
}
