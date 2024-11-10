const express = require("express");
const { getInterestedAgents, getAllAgents } = require("../controllers/emClientController");

const emClientRoutes = express.Router();
const apicache = require('apicache');

const cache = apicache.middleware;

emClientRoutes.get("/getInterestedAgents", getInterestedAgents);
emClientRoutes.get('/getAllAgents',getAllAgents);
module.exports = emClientRoutes;
