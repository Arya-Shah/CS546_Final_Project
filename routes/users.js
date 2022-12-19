const express = require('express');
const router = express.Router();
const path = require('path');
const data = require('../data');
const { checkUser, createUser } = require('../data/users');
const garageData = data.get;

router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    const email = req.body.emailInput;
    const password = req.body.passwordInput;
    try {
        if (!email) throw "No email provided";
        if (!password) throw "No password provided";

        // email

        if (typeof(email) != 'string') throw "email not string";
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (emailRegex.test(email.trim())) {

        }
        const emailToSubmit = email.toLowerCase();

        // password

        if (typeof(password) != 'string') throw "Password not string";
        var passTest = /^\S*$/.test(password);
        if (!passTest) throw "Space in password. Not allowed."
        if (password.length < 6) throw "Password less than 6 char long."


        passTest = /(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password);
        if (!passTest) throw "Password must have uppercase letter, digit, and special character."

        const loginCheck = await checkUser(emailToSubmit, password);
        if (loginCheck.authenticatedUser == true) {
            req.session.user = {email: email, logged_in: true}
            console.log("ROUTE TIME");
            res.redirect('/');
        } else {
            res.render('login', {'title': 'Login', 'error': "Invalid email pass combo"})
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).render('login', {'title': 'Login', 'error': e});
    }
  })

router.route('/register').post(async (req, res) => {
    const email = req.body.emailInput;
    const password = req.body.passwordInput;
    const name = req.body.nameInput;

    console.log("start of func");
    try {
        if (!name) throw "No name provided";
        if (!password) throw "No password provided";
        if (!email) throw "No email provided";
        // name
  
        if (typeof(name) != 'string') throw "name not string";
        let nameRegex = /([A-Za-z]+[ ][A-Za-z]+)/;
        if (!nameRegex.test(name.trim())) throw "name not in correct form"

        // email

        if (typeof(email) != 'string') throw "email not string";
        let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email.trim())) throw "not valid email";
        const emailToSubmit = email.trim().toLowerCase();

        // password

        if (typeof(password) != 'string') throw "Password not string";
        var passTest = /^\S*$/.test(password);
        if (!passTest) throw "Space in password. Not allowed."
        if (password.length < 6) throw "Password less than 6 char long."

        passTest = /(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password);
        if (!passTest) throw "Password must have uppercase letter, digit, and special character."
  
        const registerCheck = await createUser(name.trim().toLowerCase(), emailToSubmit, password);
        if (registerCheck.insertedUser == true) {
            console.log("redirecting to login?");
            res.redirect('/login'); 
        } else {
          res.status(500).send("Internal Server Error");
        }
      }
      catch (e) {
        res.status(400).render('register', {'title': 'Login', 'error': e});
      }
})

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
