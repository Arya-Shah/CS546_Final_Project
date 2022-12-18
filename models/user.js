var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	isGarage: Boolean,
	historyOfSchedule:Array,
	favoriteGarages: Array,
}),
User = mongoose.model('User', userSchema);

module.exports = User;