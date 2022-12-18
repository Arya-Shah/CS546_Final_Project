var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Garage = require('../models/garage.js')
var Appointment = require('../models/appointment')
var garage = require('../data/garage')
var appointment = require('../data/appointment')

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});


router.post('/', function (req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if (req.session) {
		req.session.destroy()
	}
	if (!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf) {
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({ email: personInfo.email }, function (err, data) {
				if (!data) {
					var c;
					User.findOne({}, function (err, data) {

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						} else {
							c = 1;
						}

						var newPerson = new User({
							unique_id: c,
							email: personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							isGarage: personInfo.owner === "on" ? true : false,
							historyOfSchedule: [],
							favoriteGarages: []
						});

						newPerson.save(function (err, Person) {
							if (err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({ _id: -1 }).limit(1);
					res.send({ "Success": "You are regestered,You can login now." });
				} else {
					res.send({ "Success": "Email is already used." });
				}

			});
		} else {
			res.send({ "Success": "password is not matched" });
		}
	}
});

router.get('/login', function (req, res, next) {
	if (req.session) {
		req.session.destroy()
	}
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	
	User.findOne({ email: req.body.email }, function (err, data) {
		if (data) {



			if (data.password == req.body.password) {
				if (data.isGarage) {
					req.session.userId = data.unique_id;
					res.send({ "Success": "Garage!" });

				} else {
					req.session.userId = data.unique_id;
					res.send({ "Success": "User!" });
				}

			} else {
				res.send({ "Success": "Wrong password!" });
			}
		} else {
			res.send({ "Success": "This Email Is not regestered!" });
		}
	});
});

router.get('/garage', function (req, res, next) {
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			return res.render('gland.ejs');
		}
	});
});


router.get('/user', function (req, res, next) {
	User.findOne({ unique_id: req.session.userId }, async function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			const garagecc = Garage;
			let garageExist;
			if(req.query.searchGarageName && req.query.searchGarageName!=""){
				garageExist = await garagecc.find({"name": {$regex : req.query.searchGarageName , '$options' : 'i'}});
				garageExist = Array.from(garageExist);
			}
			else
				garageExist = await garagecc.find({});

			//if (!garageExist) return { msg: "Tari ma no lodo" };
			return res.render('uland.ejs', {garageslist: garageExist, favorites: Array.from(data.favoriteGarages)});
		}
	});

});

router.get('/user/details', function (req, res, next) {
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			return res.render('data.ejs', { "name": data.username, "email": data.email,"favorite":data.favoriteGarages });
		}
	});
});

router.get('/user/garage/details', function (req, res, next) {
	User.findOne({ unique_id: req.session.userId }, async function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			const garagecc = Garage;
			if(req.query.GarageName && req.query.GarageName!=""){
				const garageExist = await garagecc.findOne({"name": req.query.GarageName});
				return res.render('gdetails.ejs', { garage: garageExist });
			}
			else{
				res.redirect('/user');
			}
		}
	});
});


router.get('/user/favorite', function (req, res, next) {
    User.findOne({ unique_id: req.session.userId }, function (err, data) {
        console.log("data");
        console.log(data);
        if (!data) {
            res.redirect('/');
        } else {
            const favorite = Array.from(data.favoriteGarages);
            return res.render('favorites.ejs', { "data": favorite });
        }
    });
});
router.post('/user/setfavorite', function (req, res, next) {
	User.findOne({ unique_id: req.session.userId }, async function (err, data) {
		if (!data) {
			res.redirect('/')
			return
		}
		const favorite = Array.from(data.favoriteGarages);
		let favorite_ = req.body.favorite;
		if (favorite_)
			favorites_ = favorite.push(favorite_);
		console.log(favorite);
		const myquery = { email: data.email };
		data.favoriteGarages = favorite
		const update = await User.updateMany({_id:data._id }, { $set: { favoriteGarages: favorite } });
		if (!data) {
			res.redirect('/');
		} else {
			res.redirect('/user');
		}
	});
});


router.get('/garage/management', async (req, res, next) => {
    //code here for GET
    // TODO: Get specific garage from user's page, load appts from that garage specifically
    let appointmentsTemp = await appointment.getAllAppointments();
    // TODO: Remove management visited b/c its just used for testing as an example
    req.session.management_visited = "MANAGEMENT VISITED";
    res.render('garage_management', {'title': 'Garage Management', 'appointments': appointmentsTemp})
  });

router.get('/garage/create_appointment', async(req,res) => {
    res.render('create_appointment', {'title': 'Create Appointment'})
});


router.post('/garage/management', async (req, res) => {
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

router.post('/user/schedule', async function (req, res, next) {
		try{
		const userCollection = User; 
		const garageCollection = Garage; 
		const appointment = Appointment;
		const userExist = await userCollection.findOne({ unique_id: req.session.userId });
		const garageExist = await garageCollection.findOne({ name: req.body.garageName });
		if (!garageExist) return { msg: "Either the username or password is invalid" }
		if (!userExist) return { msg: "Either the userna`me or password is invalid" }
		const time = new Date().toISOString();
		const createAppointment = {
				user_id: userExist._id,
    			garage_id: garageExist._id,
    			date_time: time
			}
		const insertInfo = await appointment.save(createAppointment);
		if (!insertInfo.acknowledged || !insertInfo.insertedId)
			throw 'Could not add User';
		const newId = insertInfo.insertedId.toString();
		return newId;
		}catch(e){
			console.log(`Error favorit:${e}`);
		}
	
	});

	router.get('/user/getHistory', async function (req, res, next) {
		try {
			const userCollection = User;
			const userExist = await userCollection.findOne({ unique_id: req.session.userId });
			if (!userExist) return { msg: "Either the username or password is invalid" }
			const history = Array.from(userExist.historyOfSchedule);
				return res.render('history.ejs', { "data": history });
		} catch (e) {
			throw (`History Error:${e}`)
		}
	});
	


router.get('/user/search', async function (req, res, next) {
	const userCollection = User;
	const userExist = await userCollection.findOne({ unique_id: req.session.userId });
	if (!userExist) return { msg: "Either the username or password is invalid" }

	const garagecc = Garage;
	let garageExist;
	if(req.body.searchGarageName && req.body.searchGarageName != "")
	{
		garageExist = await garagecc.findOne({"name": {$regex : req.body.searchGarageName}});
	}
	else
	{
		garageExist = await garagecc.find({});
	}
	if (!garageExist) return { msg: "No garages found" };
	return res.render('uland.ejs', {"garageslist": garageExist});
});




router.get('/garage', function (req, res, next) {
	console.log("profile");
	User.findOne({ unique_id: req.session.userId }, function (err, data) {
		console.log("data");
		console.log(data);
		if (!data) {
			res.redirect('/');
		} else {
			res.redirect('/garage');
			// return res.render('index.ejs', {"name":data.username,"email":data.email});
		}
	});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
		// delete session object
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({ email: req.body.email }, function (err, data) {
		console.log(data);
		if (!data) {
			res.send({ "Success": "This Email Is not regestered!" });
		} else {
			// res.send({"Success":"Success!"});
			if (req.body.password == req.body.passwordConf) {
				data.password = req.body.password;
				data.passwordConf = req.body.passwordConf;

				data.save(function (err, Person) {
					if (err)
						console.log(err);
					else
						console.log('Success');
					res.send({ "Success": "Password changed!" });
				});
			} else {
				res.send({ "Success": "Password does not matched! Both Password should be same." });
			}
		}
	});

});

module.exports = router;