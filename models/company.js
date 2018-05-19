const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    //'name' is a required field
    name:{type: String},
    //'address' field if not specified is empty
    address: {type: String, default: ''},
    city: {type: String, default: ''},
    country: {type: String, default: ''},
    sector: {type: String, default: ''},
    website: {type: String, default: ''},
    //'admin' is defined of type 'ObjectId' in mongoDB 
    //'ref' field refers to user schema having name 'User' in usermodel.js
    admin: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    imageId: {type: String, default: ''},
    imageVersion: {type: String, default: ''},
});

//In database collection name would be "Companies', plural form made by Mongo
module.exports = mongoose.model('Company', companySchema);