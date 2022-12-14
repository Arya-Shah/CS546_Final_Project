const { ObjectId } = require('mongoose/lib/schema');
const appointments = require('../models/appointment');
const user = require('../models/user');


const getAllAppointments = async () => {
  const appointmentCollection = appointments;

  const appointmentList = await appointmentCollection.find({});
  return appointmentList;
}

const createAppointment = async (
    user_id,
    garage_id,
    garage_name,
    date_time,
    service,
    total_price
) => {
    if (!user_id) throw "No user_id";
    if (!garage_id) throw "No garage_id";
    if (!date_time) throw "No date_time";
    if (!service) throw "No service";
    if (!garage_name) throw "No garage_name";

    if (typeof(user_id) != 'string') throw "user_id not string";
    if (typeof(garage_id) != 'string') throw "garage_id not string";
    if (typeof(date_time) != 'string') throw "date_time not string";
    if (typeof(service) != 'string') throw "service not string"
    if (typeof(total_price) != 'number') throw "total_price not number"
    if (typeof(garage_name) != 'string') throw "garage_name not string"


    // TODO: Add check for user_id in users database
    // TODO: Add check for garage_id in garage database
    // throw if either fail

    let test_date = new Date(date_time);
    if (!test_date.getTime()) throw "invalid Date string";

    if (service.trim().length == 0) throw "empty service str";
    if (garage_name.trim().length == 0) throw "empty garage_name str";

    let price_regex = /^\d+(,\d{3})*(\.\d{1,2})?$/;
    if(!price_regex.test(String(total_price))) throw "price invalid";

    const appointmentCollection = appointments;

    let new_appt = new appointmentCollection({
        user_id: user_id,
        garage_id: garage_id,
        garage_name:garage_name,
        date_time: date_time,
        service: service,
        total_price: total_price,
        is_done: false
      });
  
      await new_appt.save(async function (err, data) {
        if (err)
        throw 'Could not add new appointment';
        else
          return 'Success';
      });
  
};

const deleteAppointment = async (apptId) => {
    if (!apptId) throw 'You must provide an id to search for';
    if (typeof(apptId) != 'string') throw 'Id must be a string.';
    if (apptId.trim().length == 0) throw "Id must not be empty string";
  
    if (!ObjectId.isValid(apptId)) throw "Id is not a valid ObjectId";
    
    const idPass = ObjectId(apptId);
  
    const appointmentCollection = appointments;
    const deletionInfo = await appointmentCollection.deleteOne({_id: idPass});
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete movie with id of ${movieId}`;
    }
    return `Successful deletion of appointment`
  };
  
  module.exports = {
    createAppointment,
    deleteAppointment,
    getAllAppointments,
  };