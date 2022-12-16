const express = require('express');
const { createAppointment, deleteAppointment } = require('../data/appointments');
const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    console.log('a');
  })

router
  .route('/management')
  .get(async (req, res) => {
    //code here for GET
    res.render('garage_management', {'title': 'Garage Management'})
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
    }
    catch (e) {
        console.log(e);
    }
    });

module.exports = router;