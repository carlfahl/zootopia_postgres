## Tutorial on adding user auth with passport npm module.

install the passport npm module and save it to dependencies in the express server directory.
`npm install --save passport`

Passport has serveral stratigies for user authentication. We will
use the local stratigy here.

`npm install --save passport-local`

passport is used as Express middleware to authenticate users:
import passport with
```js
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
```
```js
app.use(passport.initialize());
```

Create a model for user data in `models/user.js` including fields for username and password.

Create a routes file `routes/users.js`
