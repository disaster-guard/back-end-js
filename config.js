var dotenv = require('dotenv').config();
var cfg = {};

cfg.database = 'mongodb://localhost/disaster-guard';

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET;

cfg.clarifaiId = process.env.CLARIFAI_ID;
cfg.clarifaiSecret = process.env.CLARIFAI_SECRET;

var requiredConfig = [cfg.clarifaiId, cfg.clarifaiSecret];
var isConfigured = requiredConfig.every(function(configValue) {
    return configValue || false;
});

if (!isConfigured) {
    var errorMessage =
        'CLARIFAI_ID, CLARIFAI_SECRET must be set.';
    throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;