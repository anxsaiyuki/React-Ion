const express = require('express');
const userController = require('../../../db/controllers/userController');

const router = new express.Router();

router.route('/login')
  .post(userController.login);

router.route('/signup')
  .post(userController.signup);

module.exports = router;

