
const express = require('express');
const router = express.Router();
const data = require('../data');
const garagedata = data.garages;
//const userData = data.users;

let serviceType = ['pickuppart', 'maintainance', 'delivercar'];
serviceType.sort();

// Route for the page of all garages
router.get('/garage', async (req, res) => {
    const garages = await garagedata.getAllgarages();
    return res.render('garages/list', { 
        authenticated: req.session.user ? true : false,
        user: req.session.user,
            title: 'All Garages',
            partial: 'garages-list-script', 
            garages: garages
    });
});

module.exports = router;