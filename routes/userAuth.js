var User = require('../models/user');
var Location = require('../models/location');

module.exports = function (app, passport) {

  // app.get('/login', function(req, res) {
  // });

  // process the login form
  // app.post('/login', do all our passport stuff here);
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
      res.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json(user);
      })
    });
  });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  // render the page and pass in any flash data if it exists
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
    // res.json({'message': 'This is the signup page.'});
  });

  app.post('/signup', function (req, res, next) {
    console.log('doing signup');
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        console.log('In first error');
        return next(err);
      } else {
        if (!user) {
          console.log("Email already taken error");
          res.json({message: "That email is already taken"})
        } else {
          // user.save(function(e) {
            // if(e){
              // console.log("inside the throw error");
              // throw e;
            // }
            // console.log(user, "inside save user success");
            res.json(user);
          // });
        }
      }
    });
  });

  app.get('/profile', isLogedIn, function (req, res) {
    // Find the user object
    User.findById(req.user._id)
      // Fill in the values from the location object that the user object references.
      // user.location is an ._id
      // Like: Location.findById(user.location)
      .populate('location')
      .exec(function (err, data) {
        console.log(data);
        if (err) {
          console.log(err);
          // res.render('profile', {user: req.user, message: req.flash('updateMessage') });
        } else {
          res.render('profile', {user: data, message: req.flash('updateMessage') });
        }
      });
  });

  app.post('/update', isLogedIn, function (req, res) {
    // Find a user object.
    User.findById(req.user._id, function (err, user) {
      if (err) {
        req.flash('updateMessage', 'Update Failed: Failed to Lookup User.');
        res.redirect('/profile');
        console.log(err);
      } else {
        // Create a location object
        var location = new Location();
        location.city = req.body.city;
        location.state = req.body.state;
        location.zip = req.body.zip;
        // Save the location object.
        location.save(function (err, location) {
          if (err) {
            console.log(err);
            req.flash('updateMessage', 'Update Failed: Failed to Save Location.');
            res.redirect('/profile');
          }
          // Relate the user object to the location object
          user.location = location._id;
          // Resave the user object with the new location.
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
