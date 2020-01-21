var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.secret,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlResult = require('../controllers/resulthandling');

router.get('/user', auth, ctrlProfile.profileRead);
router.get('/topresults', ctrlResult.retrieveTop);
router.post('/result', ctrlResult.retrieveOwn);

router.post('/signup', ctrlAuth.register);
router.post('/signin', ctrlAuth.login);
router.post('/play', ctrlResult.result);

module.exports = router;
