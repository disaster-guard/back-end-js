var express = require('express');
var router = express.Router();
var User = require('./models/user');
var Flare = require('./models/position');

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
          res.json({status:"user created successfully"});
      }
  });
});

router.post('/oauth', function(req, res, next) {
  if (secret != req.body.client_secret) {
      res.status(403).send({ error: 'Bad secret' });
  } else {
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send("User not found!");
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                // TODO: replace hard-coded UUID with a dynamic UUID functional NPM package
                res.json({access_token: "123-456", token_type:'*', expires_in: 1000});
            }
        }
    });
  }
});

router.post('/api/flare', function(req, res, next) {
    var flare = new Flare();
    console.log(req.body);
    flare.longitude = req.body.longitude;
    flare.latitude = req.body.lat;
    flare.userId = req.body.user_id;
    // TODO: replace hard-coded UUID with a dynamic UUID functional NPM package
    if (req.get("Authorization") !== "123-456") {
        return res.status(403).send({error: 'Bad auth header'});
    }
    flare.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json({status:"flare saved successfully"});
        }
    });
});

module.exports = router;
