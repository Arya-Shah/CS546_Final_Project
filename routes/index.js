const userRoutes = require("./user");
const garageOwnerRoutes = require("./garageOwner");
// const loginRoutes = require("./login");

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/garage", garageOwnerRoutes);

    app.get('/', (req, res) => {
        res.render('homepage', {'title': 'Homepage'})
    });

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;