'use strict';
const config = require('../../config.json');
const mongoose = require('mongoose');
mongoose.connect(config.connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = {
  Petition: require('../models/petition'),
  User: require('../models/user')
};
