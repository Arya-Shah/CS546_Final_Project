
const express = require('express');
const router = express.Router();
const data = require('../data');
const garagedata = data.garages;
//const userData = data.users;
const { ObjectId } = require('mongodb');
const { createAppointment, deleteAppointment, getAllAppointments, getAllAppointmentsByGarage, getAllAppointmentsByUser, getAllAppointmentsByUserAndGarage } = require('../data/appointments');
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
        'garages': garages,
        'user_email': req.session.email
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
          appointmentsTemp = await getAllAppointmentsByUserAndGarage(req.session.user_id, garage_id);
        }
        console.log("Appointments Temp: " + appointmentsTemp);
        res.render('garage_info', {'title': 'Garage Info', 'appointments': appointmentsTemp, 'garage': garageTemp, 'cur_user': req.session.user_id, 'user_email': req.session.email });
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
      let appointmentsTemp = await getAllAppointmentsByGarage(garageTemp._id.toString());
      console.log("Appointments Temp: " + appointmentsTemp);
      res.render('garage_management', {'title': 'Garage Management', 'appointments': appointmentsTemp, 'garage': garageTemp, 'user_email': req.session.email});
    }
  });

router
  .route('/create_appointment/:garage_id')
  .get(async (req, res) => {
    //code here for GET
    if (!req.session.user) {
      res.status(403).redirect('/');
    } else {
      let garage_id = req.params.garage_id;
      if (!garage_id) {
        res.status(404).redirect('/');
      } else {
        if(!ObjectId.isValid(garage_id)){
          res.status(404).redirect('/');
        } else {
          let garageTemp = await getgarage(garage_id);
          let services = garageTemp.serviceOptions;
          res.render('create_appointment', {'title': 'Create Appointment', 'garage': garageTemp, 'services': services, 'cur_user': req.session.user_id, 'user_email': req.session.email });
        }
      }
    }
  })
  .post(async (req, res) => {
    try {
        console.log(req.body)
        if (!req.session.user) {
          res.status(403).redirect('/');
        } else {
          let spaghetti = await createAppointment(req.session.user_id, req.params.garage_id, req.body.dateTimeInput, req.body.serviceInput, 3.21);
          console.log(spaghetti);
          res.redirect('/garage/info/' + req.params.garage_id);
        }
    }
    catch (e) {
        console.log(e);
    }
    });

module.exports = router;