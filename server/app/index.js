'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
// var bodyParser = require('body-parser');
var User = require('../api/users/user.model');

app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(session({secret: 'tongiscool'}));

app.use(function (req, res, next) {
  console.log('session', req.session);
  // if (!req.session.counter) req.session.counter = 0;
  // console.log('counter', req.sessionID, ++req.session.counter);
  next();
});

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.post('/login', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  // console.log("EMAIL & PW", email, password);

  User.findOne({
      email: email,
      password: password
    })
    .then(function(user) {
      // console.log("/login POST", user);
      if(!user) {
        res.sendStatus(401);
      } else {
        req.session.userId = user._id;
        req.session.cookie.maxAge = 1000000;
        // console.log('session', req.session);
        res.sendStatus(200);
      }
    })
    .then(null, next);
});

app.post('/logout', function(req, res, next) {
  console.log("logging out hopefully", req.session.userId);

  User.findOne({
      _id: req.session.userId
    })
    .then(function(user) {
      if(!user) {
        res.sendStatus(401);
      } else {
        req.session.userId = null;
        res.sendStatus(200);
      }
    })
    .then(null, next);
});

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];

var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function(stateRoute) {
  app.get(stateRoute, function(req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
