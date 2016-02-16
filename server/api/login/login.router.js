'use strict';

var router = require('express').Router();
var User = require('../users/user.model');

// router.post('/login', function(req, res, next) {
//   var email = req.body.email;
//   var password = req.body.password;
//   console.log("EMAIL & PW", email, password);
//   User.findOne({
//       email: email,
//       password: password
//     })
//     .then(function(user) {
//       console.log("/login POST", user);
//       if(!user) {
//         res.sendStatus(401);
//       } else {
//         req.session.userId = user._id;
//         res.sendStatus(200);
//       }
//     })
//     .then(null, next);
// });


module.exports = router;