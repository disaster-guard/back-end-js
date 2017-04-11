var express = require('express');
var router = express.Router();
var User = require('./models/user');

var secret = "p7lrAtXIa15549Qq5a8gGNoOzuVwYRQfOYTcMWyh";

router.post('/register', function(req, res, next) {
  var user = new User();
  console.log(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
    user.save(function(err) {
      if (err) {
          res.send(err);
      } else {
          res.json({status:"saved successfully"});
      }
  });
});

router.post('/oauth', function(req, res, next) {
  if (secret != req.body.client_secret) {
      res.status(403).send({ error: 'Bad secret' });
  } else {
    User.findOne({ name: req.body.name }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send("User not found!");
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                res.json({access_token: "123-456", token_type:'*', expires_in: 1000});
            }
        }
    });
  }
});

module.exports = router;
