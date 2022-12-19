var mongoose = require('mongoose');
var Schema = mongoose.Schema;

appointmentSchema = new Schema( {
    
    user_id: String,
    garage_id: String,
    garage_name:String,
    date_time: String,
    service: Array,
    total_price: Number,
    is_done: Boolean
}),
Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;