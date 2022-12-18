const { url } = require('inspector');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

garageSchema = new Schema({
      name: String,
      location: String,
      phoneNumber: String,
      website: String,
      overallRating: Number,
      serviceOptions: Array
    
}),
Garage = mongoose.model('Garage', garageSchema);

module.exports = Garage;