var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;
mongoose.Promise = global.Promise;

var positionSchema = new Schema({
    longitude: Number,
    latitude: Number,
    userId: Number
}, { collection: 'flares' });

var Position = mongoose.model('Position', positionSchema);
module.exports = Position;