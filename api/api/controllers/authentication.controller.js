'use strict';
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  register: function(req, res) {
    var user = new User(
      {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email
      }
    );

    user.setPassword(req.body.password);

    user.save(function(err) {
      if (err) {
        res.status(400).json(err);
        return;
      }
      var token = user.generateJwt();
      res.status(200);
      res.json({
        'token': token
      });
    });
  },
  login: function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
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
          'token': token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res, next);
  }
};
