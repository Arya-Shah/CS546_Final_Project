const userRoutes = require("./users");
const baseRoutes = require("./base");
const garageroutes = require("./garage")
const path = require('path');

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/garage", garageroutes);
    app.use("/", baseRoutes);

	app.use("*", (req, res) => {
		res.status(400).json({error: 'Not found.'});
	});
}

module.exports = constructorMethod;