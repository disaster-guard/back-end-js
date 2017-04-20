var express = require('express');
var router = express.Router();
var config = require('../config');
var PythonShell = require('python-shell');
var Flare = require('./models/position');
var Upload = require('./models/multer');
var User = require('./models/user');

var secret = config.secret;
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
          res.status(405).send(err);
      } else {
          res.status(200).json({status:"user created successfully"});
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
            res.status(403).send({ error: 'User not found' });
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                res.status(200).json({access_token: tokenValue, token_type:'*', expires_in: 1000});
            }
        }
    });
  }
});

router.post('/api/flare', function(req, res, next) {
    var flare = new Flare();
    flare.longitude = req.body.longitude;
    flare.latitude = req.body.lat;
    flare.userId = req.body.user_id;
    if (req.get("Authorization") !== tokenValue) {
        return res.status(403).send({error: 'Bad auth header'});
    }
    flare.save(function(err) {
        if (err) {
            res.status(408).send(err);
        } else {
            res.status(200).json({status:"flare saved successfully"});
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
            res.status(404).send("User not found!");
        } else if (user) {
            // check if password matches
            if (user.user_id == null) {
                res.status(403).json({ success: false, message: 'bad token.' });
            } else {
                res.status(200).json({user_id: user.user_id});
            }
        }
    });
});

router.get('/api/nearbyProfile', function(req, res, next) {
    var picture = "http://eadb.org/wp-content/uploads/2015/08/profile-placeholder.jpg";
    User.findOne({ email: req.param("email") }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(404).send("User not found!");
        } else if (user) {
            // check if password matches
            if (user.email == null) {
                res.status(404).json({ success: false, message: 'User not found.' });
            } else {
                res.status(200).json({name: user.name, picture: picture});
            }
        }
    });
});

router.post('/api/uploadPredictionPicture', function(req, res, next) {
    var fileFun = Upload.single('image');
    fileFun(req, res, function (err) {
        if (err) {
            console.log("FAILED TO UPLOAD!");
            console.log(err);
            res.status(505).send(err);
            // An error occurred when uploading
        } else {
            console.log("UPLOAD SUCCESS!");
            console.log(req.file); //form files
            /* example output:
             { fieldname: 'image',
             originalname: 'photo.png',
             encoding: '7bit',
             mimetype: 'image/png',
             destination: './images/',
             filename: 'image-436ec561793aa4dc475a88e84776b1b9.jpg',
             path: 'uploads/image-436ec561793aa4dc475a88e84776b1b9.png',
             size: 277056 }
             */
            var options = {
                mode: 'text',
                args: [req.file.path, config.clarifaiId, config.clarifaiSecret]
            };
            PythonShell.run('predict.py', options, function (err, results) {
                if (err) throw err;
                res.status(200).json(JSON.parse(results[0]));
            });
        }
    });
});

module.exports = router;
