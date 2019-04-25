'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./api/routes/routes');
const errorHandler = require('./api/helpers/error-handler');
const passport = require('passport');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

require('./api/config/passport');

app.use(passport.initialize());
// api routes
app.use('/api', routes);

// global error handler
app.use(errorHandler);

module.exports = app;
