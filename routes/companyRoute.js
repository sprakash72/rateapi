const express = require('express');
const companyCtrl = require('../controllers/companyController');
// import express from "express";
// import { create } from "../controllers/companyController";

const router = express.Router();

router.post('/company/create', companyCtrl.createCompany);
router.get('/company/all', companyCtrl.getAllCompanies);


module.exports = router;