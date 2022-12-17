var mongoose = require('mongoose');
var Schema = mongoose.Schema;

garageSchema = new Schema( {
	
	unique_id: Number,
	zip_code: Number,
	services_offered: Array,
	hours: String,
	price: Array,
	contact: String,
	payment_method: Array,
	inventory: String,
	isGarage: Boolean
}),
Garage = mongoose.model('Garage', garageSchema);

module.exports = User;