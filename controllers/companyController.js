const CompanyModel = require('../models/company');

exports.createCompany = async function(req, res){
    console.log(req.body);

    if (req.body.name === undefined || req.body.address === undefined || req.body.city === undefined ||
        req.body.country === undefined || req.body.sector === undefined || req.body.website === undefined) {
        return res.status(200).json({ error: 'You cannot create company with empty fields' });
    }

    if (req.body.name === '' || req.body.address === '' || req.body.city === '' ||
        req.body.country === '' || req.body.sector === '' || req.body.website === '') {
        return res.status(200).json({ error: 'You cannot create company with empty fields' });
    }

    const newCompany = new CompanyModel();

    newCompany.name = req.body.name;
    newCompany.address = req.body.address;
    newCompany.city = req.body.city;
    newCompany.country = req.body.country;
    newCompany.sector = req.body.sector;
    newCompany.website = req.body.website;
    newCompany.admin = req.body.userId;

    const companyData = await newCompany.save();

    console.log("Company created successfully..")
    
    return res.status(200).json({message: 'Company created successfully'});
}

exports.getAllCompanies = async function(req, res) {
    const result = await CompanyModel.find({});

    return res.status(200).json({companies : result});
}