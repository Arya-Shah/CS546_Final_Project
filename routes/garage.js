
const express = require('express');
const router = express.Router();
const data = require('../data');
const garagedata = data.garages;
//const userData = data.users;
const { ObjectId } = require('mongodb');
const { createAppointment, deleteAppointment, getAllAppointments, getAllAppointmentsByGarage, getAllAppointmentsByUser } = require('../data/appointments');
const { getGarageByOwner, getgarage } = require('../data/garages');

let serviceType = ['pickuppart', 'maintainance', 'delivercar'];
serviceType.sort();

// Route for the page of all garages
router.get('/garage_list', async (req, res) => {
    const garages = await garagedata.getAllgarages();
    res.render('garage_list', { 
        'authenticated': req.session.user ? true : false,
        'user': req.session.user,
        'title': 'All Garages',
        'garages': garages
    });
});

router
  .route('/info/:id')
  .get(async (req, res) => {
    console.log(req.params);
    let garage_id = req.params.id;
    if (!garage_id) {
      res.status(404).redirect('/');
    } else {
      if(!ObjectId.isValid(garage_id)){
        res.status(404).redirect('/');
      } else {
        let garageTemp = await getgarage(garage_id);
        console.log("GarageTemp: " + garageTemp);
        let appointmentsTemp = '';
        if(req.session.user_id) {
          appointmentsTemp = await getAllAppointmentsByUser(req.session.user_id);
        }
        console.log("Appointments Temp: " + appointmentsTemp);
        res.render('garage_info', {'title': 'Garage Info', 'appointments': appointmentsTemp, 'garage': garageTemp, 'cur_user': req.session.user_id });
      }
    }
  });

router
  .route('/management')
  .get(async (req, res) => {
    //code here for GET
    if (!req.session.user_id) {
      console.log('in redirect');
      res.redirect('/');
    } else {
      let garageTemp = await getGarageByOwner(req.session.user_id);
      if(!garageTemp) res.redirect('/');

      console.log("Garage Temp:" + garageTemp);
      // TODO: Get specific garage from user's page, load appts from that garage specifically
      let appointmentsTemp = await getAllAppointmentsByGarage(garageTemp._id.toString());
      console.log("Appointments Temp: " + appointmentsTemp);
      res.render('garage_management', {'title': 'Garage Management', 'appointments': appointmentsTemp, 'garage': garageTemp});
    }
  });

router
  .route('/create_appointment')
  .get(async (req, res) => {
    //code here for GET
    res.render('create_appointment', {'title': 'Create Appointment'})
  })
  .post(async (req, res) => {
    try {
        console.log(req.body)
        let spaghetti = await createAppointment("123456", "432156", req.body.dateTimeInput, req.body.serviceInput, 3.21);
        console.log(spaghetti);
        // let spaghetti = await deleteAppointment('639c1a9142613d44a5a0633c');
        // console.log(spaghetti);
        res.redirect('back');
    }
    catch (e) {
        console.log(e);
    }
    });

module.exports = router;