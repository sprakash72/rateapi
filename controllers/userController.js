const passport = require('passport');
const UserModel = require('../models/usermodel');

exports.createUser = (req, res, next) => {
    
    if(req.body.fullname === undefined || req.body.email === undefined || req.body.password === undefined){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }

    if(req.body.fullname === '' || req.body.email === '' || req.body.password === ''){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }
    
    
    passport.authenticate('local-signup', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }
     
    
        if(info){
            return res.status(200).json({error: info});
        }
      
        return res.status(201).json({message: 'User successfully created', user: user});
    })(req, res, next);
}

exports.loginUser = (req, res, next) => {
    
    if(req.body.email === undefined || req.body.password === undefined){
        return res.status(200).json({error: 'You cannot submit empty fields'});
    }
    
    if(req.body.email === '' || req.body.password === ''){
        return res.status(200).json({error: 'You cannot submit empty fields to login'});
    }
    
    
    passport.authenticate('local-login', (err, user, info) => {
        if(err){
            return res.status(200).json({error: err});
        }
     
    
        if(info){
            return res.status(200).json({error: info});
        }
      
        return res.status(201).json({message: 'User successfully logged in', user: user});
    })(req, res, next);
}

// exports.getHomePage = (req, res) => {
//     UserModel.findOne({'email': req.param.email}, (err, user) =>{

//     })
// }

//This route definition using 'async' & 'await' is equivalent to one above
exports.getHomePage = async (req, res) => {
    console.log(req.params.email);
    //set password field to 0 to exclude it from return
    const result = await UserModel.findOne({'email': req.params.email}, {'password' : 0});

    console.log(result);
    ///set response status and convert to json object
    return res.status(200).json({user: result});
}