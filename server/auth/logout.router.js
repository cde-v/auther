var router = require('express').Router();
var User = require('../api/users/user.model');

router.post('/', function(req, res, next) {
  // console.log("logging out hopefully", req.session.userId);

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

module.exports = router;