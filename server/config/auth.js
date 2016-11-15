const passport = require('passport');
const User = require('../../db/models/userModel');
const bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.get({ id }, (err, user) => {
      done(err, user);
    });
  });

  const validateUserPass = (username, password, done) => {
    User.get({ username }, (err, users) => {
      if (err) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      if (users.length) {
        const salt = users[0].salt;
        const encryptpw = users[0].password;

        if (bcrypt.hashSync(password, salt) === encryptpw) {
          console.log('match');
          return done(null, users[0]);
        } else {
          console.log('not a match');
          return done(null, false, { message: 'Incorrect username or password.' });
        }
      } else {
        console.log('no username exists');
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    });
  };

  passport.use(new LocalStrategy(validateUserPass));
};

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
