const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

module.exports = (app, express) => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../views'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '/../../client')));
  app.use(session({ secret: 'password', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
};
