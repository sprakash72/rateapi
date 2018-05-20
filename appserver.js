const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
///Helmet enables security through http headers
const helmet = require('helmet');
//compress request body when transferring over http
const compression = require('compression');
require('./passport/passportlocal');

const app = express();

mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/rateapp");
//key/value pairs will be provided on heroku
mongoose.connect(process.env.MONGODB);
// mongoose.connect('mongodb://admin:password@ds229290.mlab.com:29290/ratingapp');

app.use(helmet());
app.use(compression());

app.use(cors());
app.use((req, res, next)  => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    // secret: 'secretkey',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session());

const user = require('./routes/userRoute');
const company = require('./routes/companyRoute');
app.use('/api', user); //all 'user' routes will have '/api' prepended in URL 
app.use('/api', company);

app.listen(process.env.PORT || 3000, function(){
    console.log('Server running on port 3000');
});
