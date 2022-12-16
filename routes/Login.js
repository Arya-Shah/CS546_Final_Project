
const express=require('express');
const router=express.Router();
const data=require('../data');
const garageData = data.garages;
const userData=data.users;

router
    .route('/login')
    .post(async (req,res)=>{
        const data=req.body;
        const username=data.username;
        const password=data.password;

        if(!username){
            return res.status(400).render('newMain', { error: "your input username cannot be empty." });
        }

        if(typeof username !=='string'){
            return res.status(400).render('newMain', { error: 'your username input has to be a string, please input again.' });
        }

        if(username.trim().length===0){
            return res.status(400).render('newMain', { error: 'your username input cannot be only empty space,please input again.' });
        }

        if (username.split(' ').length !== 1) {
            return res.status(400).render('newMain', { error: 'your username input cannot have space inside,please input again.' });
        }

        let regEx = /^[0-9a-zA-Z]+$/;
        if (!regEx.test(username)) {
            return res.status(400).render('newMain', { error: 'your input username has to be only alphanumberic characters,please input again.' });
        }
        

        if (username.length < 4) {
            return res.status(400).render('newMain', { error: 'your input username has to be at least 4 characters long,please input again.' });
        }

        if (!password) {
            return res.status(400).render('newMain', { error: 'your password input cannot be empty,please input again.' });
        }

        if (typeof password !== 'string') {
            return res.status(400).render('newMain', { error: 'your password has to be a string,please input again.' });
        }

        if (password.trim().length === 0) {
            return res.status(400).render('newMain', { error: 'your password input cannot have only empty spaces,please input again' });
        }

        if (password.split(' ').length !== 1) {
            return res.status(400).render('newMain', { error: 'your input password cannot have spaces inside,please input again' });
        }

        if (password.length < 6) {
            res.status(400).render('newMain', { error: 'your passwords length has to be at least 6 characters,please input again.' });
            return;
        }

        let result = await userdata.checkUser();
        try{
            if (result.authenticatedUser==true){
                res.render('new_landing_page');
            }
            else{
                res.status(500).send('Internal Server Error');

            }
        }
        catch(e){
            res.status(500).send(error);
        }
    });

module.exports=router;

