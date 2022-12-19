const userRoutes = require("./users");
const garageroutes = require("./garage")
const path = require('path');

const constructorMethod = (app) => {
    app.use("/users", userRoutes);
    app.use("/garage", garageroutes);
    
    app.get('/login', (req, res) => {
		if (req.session.user_id) {
			console.log('in redirect');
			res.redirect('/');
		  } else {
			res.render('login', {'title': 'Login'});
		  }
        	
    })
	app.get('/register', (req, res) => {
		if (req.session.user_id) {
			console.log('in redirect');
			res.redirect('/');
		  } else {
        	res.render('register', {'title': 'Register'});
		  }
    })
	app.get('/', (req, res) => {
        res.render('homepage', {'title': 'Homepage'})
    });

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;