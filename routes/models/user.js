var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;
mongoose.Promise = global.Promise;

var userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}, { collection: 'credentials' });

var User = mongoose.model('User', userSchema);
module.exports = User;