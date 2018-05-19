const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userController');

//:email is param passed to 'home' route 
router.get('/home/:email', UserCtrl.getHomePage);
router.post('/signup/user', UserCtrl.createUser);
router.post('/login/user', UserCtrl.loginUser);

module.exports = router; 