var mongoose = require('mongoose');
var Schema 	 = mongoose.Schema;
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/disaster-guard");
autoIncrement.initialize(connection);

var userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    user_id: Number
}, { collection: 'credentials' });
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'user_id' });
var User = mongoose.model('User', userSchema);
module.exports = User;