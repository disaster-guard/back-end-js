var express = require('express');
var router = express.Router();
var User = require('./models/user');
var Flare = require('./models/position');

var secret = "p7lrAtXIa15549Qq5a8gGNoOzuVwYRQfOYTcMWyh";
// TODO: replace hard-coded UUID with a dynamic UUID functional NPM package
var tokenValue = "123-456";

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
                res.json({access_token: tokenValue, token_type:'*', expires_in: 1000});
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
    if (req.get("Authorization") !== tokenValue) {
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

router.post('/api/getUserId', function(req, res, next) {
    if (req.get("Authorization") !== tokenValue) {
        return res.status(403).send({error: 'Bad auth header'});
    }
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send("User not found!");
        } else if (user) {
            // check if password matches
            if (user.user_id == null) {
                res.json({ success: false, message: 'bad token.' });
            } else {
                res.json({user_id: user.user_id});
            }
        }
    });
});

router.get('/api/nearbyProfile', function(req, res, next) {
    var picture = "http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg";
    User.findOne({ email: req.param("email") }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.send("User not found!");
        } else if (user) {
            // check if password matches
            if (user.email == null) {
                res.json({ success: false, message: 'User not found.' });
            } else {
                res.json({name: user.name, picture: picture});
            }
        }
    });
});

module.exports = router;
