const express = require('express');
const { createAppointment, deleteAppointment, getAllAppointments } = require('../data/appointments');
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
    // TODO: Get specific garage from user's page, load appts from that garage specifically
    let appointmentsTemp = await getAllAppointments();
    // TODO: Remove management visited b/c its just used for testing as an example
    req.session.management_visited = "MANAGEMENT VISITED";
    res.render('garage_management', {'title': 'Garage Management', 'appointments': appointmentsTemp})
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
