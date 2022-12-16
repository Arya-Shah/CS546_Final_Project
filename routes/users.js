const express = require('express');
const router = express.Router();
const path = require('path');
const data = require('../data');
const garageData = data.get;


router.get('/', async (req, res) => {
    res.json({ route: '/users', method: req.method });
    res.status(200).sendFile(path.resolve("static/homepage.html"))
});

router.post('/login', async (req, res) => {
    /*get req.body username and password
    const { username, password } = req.body;
    here, you would get the user from the db based on the username, then you would read the hashed pw
    and then compare it to the pw in the req.body
    let match = bcrypt.compare(password, 'HASHED_PW_FROM DB');
    if they match then set req.session.user and then redirect them to the private page
       I will just do that here */
    req.session.user = { firstName: 'Patrick', lastName: 'Hill', userId: 123 };
    res.redirect('/private');
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.send('Logged out');
});

router.route("/").post(async (req, res) => {
    try {
        let garagePostData = req.body;
        if (!garagePostData.title || !garagePostData.title.match(/^[A-Za-z]+$/)) {
            res.render('error', { layout: 'main', searchGarageName: garagePostData.title, title: 'Error', errorClass: "error" });
            res.status(404)
            return;
        }


        const data = await garageData.searchGarageName(req.body.title.toString());
        if (!data.name.length || !data.id.length) {
            res.render('error', { layout: 'main', title: 'Error', searchGarageName: garagePostData.title, errorClass: "error" }); return;
        }
        res.render('garageFound', { layout: 'main', title: 'Garages Found', name: data.name, id: data.id })
    } catch (e) {
        res.render('error', { layout: 'main', title: 'Error', searchGarageName: e, errorClass: "error" });
        res.status(400)
    }
});

module.exports = router;
