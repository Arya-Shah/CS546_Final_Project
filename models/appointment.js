var mongoose = require('mongoose');
var Schema = mongoose.Schema;

appointmentSchema = new Schema( {
	
	_id: String,
	user_id: String,
	garage_id: String,
	date_time: String,
	services: String,
	price: Number
}),
Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = User;