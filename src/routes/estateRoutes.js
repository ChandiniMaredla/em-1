const express = require("express");

const {addEstate, getClientEstates, getAllEstates} = require('../controllers/estateController');

const estateRoutes = express.Router();
const apicache = require('apicache');
const cache = apicache.middleware;

estateRoutes.get('/getClientEstates',getClientEstates);
estateRoutes.get('/getAllEstates',getAllEstates);
estateRoutes.post('/insert',addEstate);

module.exports = estateRoutes;
