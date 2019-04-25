'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  getProfile: function(req, res, next) {
    // If no user ID exists in the JWT return a 401
    if (!req.user._id) {
      res.status(401).json({
        'message': 'UnauthorizedError: private profile'
      });
    } else {
      // Otherwise continue
      User
        .findById(req.user._id)
        .exec(function(err, user) {
          res.status(200).json(user);
          next();
        });
    }
  },
  getProfiles: function(req, res, next) {
    User.find().exec().then(users => {
      const response = {
        count: users.length,
        users: users
      };
      res.status(200).json(response);
      next();
    }).catch(err => {
      console.error(err);
      res.status(500).json({error: err});
      next();
    });
  }
};
