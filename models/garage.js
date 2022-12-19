const { url } = require('inspector');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

garageSchema = new Schema({
      name: String,
      owner_id: Number,
      location: String,
      phoneNumber: String,
      website: String,
      overallRating: Number,
      serviceOptions: Array,
      inventory: Array
}),
Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;