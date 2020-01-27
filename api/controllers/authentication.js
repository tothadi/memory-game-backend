var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function (req, res) {

  if (!req.body.username || !req.body.fullname || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var newUserName = req.body.username;
  var newUserEmail = req.body.email;

  User.findOne({ newUserName }), (function (err, user) {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        res.status(200).json('Username already exists!');
      } else {
        User.findOne({ newUserEmail }), (function (err, user) {
          if (err) {
            console.log(err);
          } else {
            if (user) {
              res.status(200).json('User with this email already exists!');
            } else {
              
              var user = new User();

              user.username = req.body.username;
              user.email = req.body.email;
              user.fullname = req.body.fullname;

              user.setPassword(req.body.password);

              user.save(function (err) {
                var token;
                token = user.generateJwt();
                res.status(200);
                res.json({
                  "token": token
                });
              });
            }
          }
        })
      }
    }
  });

};

module.exports.login = function (req, res) {

  if (!req.body.username || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};