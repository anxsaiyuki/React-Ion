const User = require('../models/userModel');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

module.exports.getUser = (req, res) => {
  const id = req.params.userId;
  User.get({ id }, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    if (users.length > 0) {
      res.json(users[0]);
    } else {
      res.status(404).end('User does not exist');
    }
  });
};

module.exports.getUsers = (req, res) => {
  User.get({}, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    res.json(users);
  });
};

module.exports.createUser = (req, res) => {
  const id = req.body.userId;
  User.get({ id }, (err, users) => {
    if (err) { res.status(404).end('Unable to retrieve user'); }
    if (users.length > 0) {
      res.status(404).end('User already exists');
    } else {
      User.create({ id }, (err2, status) => {
        if (err2) { res.status(404).end('Unable to create user'); }
        res.json(status);
      });
    }
  });
};

// NOTE: When user is remove, need to remove projects related to user if
// that user is te only one who owned them
module.exports.removeUser = (req, res) => {
  const id = req.body.userId;
  User.remove({ id }, (err2, status) => {
    if (err2) { res.status(404).end('Unable to remove user'); }
    res.json(status);
  });
};

module.exports.login = passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
  });

module.exports.signup = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.get({ username }, (err, users) => {
    if (err) {
      res.status(404).end('unable to retrieve user');
    }
    if (users.length) {
      res.send('username exists');
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => {
          if (err) {
            res.send(err);
          }

          User.create({
            username,
            password: hash,
            salt,
          });

          res.send('user created');
        });
      });
    }
  });
};

