const userRoutes = require("./users");
const garageOwnerRoutes = require("./garageOwner");
const path = require('path');

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/garage", garageOwnerRoutes);

    app.get('/', (req, res) => {
        res.render('homepage', {'title': 'Homepage'})
    });
    app.get('/login', (req, res) => {
        res.sendFile(path.resolve('static/login.html'));
    })

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;