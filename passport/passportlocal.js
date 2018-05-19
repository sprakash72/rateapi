const passport = require('passport');
const localAuthStrategy = require('passport-local').Strategy;
const UserModel = require('../models/usermodel');

passport.use('local-signup', new localAuthStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    UserModel.findOne({'email': email}, (err, user) => {
        if(err) {
            return done(err);
        }

        if(user){
            return done(null, false, 'User with email already exist');
        }

        console.log(req.body);
     
        if(req.body.password.length < 5){
            return done(null, false, 'Password must not be less than 5 characters');
        }

        const newUser = new UserModel();
        newUser.fullname = req.body.fullname;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save((err) => {
            return done(null, newUser);
        })
    });
}));

passport.use('local-login', new localAuthStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    
    UserModel.findOne({'email': email}, (err, user) => {
        if(err) {
            return done(err);
        }

        if(!user){
            return done(null, false, 'User with email not found');
        }

        if(password.length < 5){
            return done(null, false, 'Password must not be less than 5 characters');
        }

        if(!user.checkPassword(req.body.password)){
            return done(null, false, 'Password is incorrect');
        }

        return done(null, user);
    });
}));