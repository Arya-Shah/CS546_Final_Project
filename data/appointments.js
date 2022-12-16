const mongoCollections = require('../config/mongoCollections');
const appointments = mongoCollections.appointments;
const { ObjectId } = require('mongodb');

// Appointments collection:
// - _id
// - user_id
// - garage_id
// - date_time
// - services
// - total_price

const createAppointment = async (
    user_id,
    garage_id,
    date_time,
    service,
    total_price
) => {
    if (!user_id) throw "No user_id";
    if (!garage_id) throw "No garage_id";
    if (!date_time) throw "No date_time";
    if (!service) throw "No service";

    if (typeof(user_id) != 'string') throw "user_id not string";
    if (typeof(garage_id) != 'string') throw "garage_id not string";
    if (typeof(date_time) != 'string') throw "date_time not string";
    if (typeof(service) != 'string') throw "service not string"
    if (typeof(total_price) != 'number') throw "total_price not number"

    // TODO: Add check for user_id in users database
    // TODO: Add check for garage_id in garage database
    // throw if either fail

    let test_date = new Date(date_time);
    if (!test_date.getTime()) throw "invalid Date string";

    if (service.trim().length == 0) throw "empty service str";

    let price_regex = /^\d+(,\d{3})*(\.\d{1,2})?$/;
    if(!price_regex.test(String(total_price))) throw "price invalid";

    const appointmentCollection = await appointments();


    let new_appt = {
        user_id: user_id,
        garage_id: garage_id,
        date_time: date_time,
        service: service,
        total_price: total_price
      };
  
      const insertInfo = await appointmentCollection.insertOne(new_appt);
      if (insertInfo.insertedCount === 0) 
        throw 'Could not add new appointment';
  
      const newId = insertInfo.insertedId;
  
      const appointment = await newId.toString();
      return appointment;
};
  
  module.exports = {
    createAppointment,
  };
  