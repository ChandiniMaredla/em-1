const express = require("express");
const {
  insertAgentRatings,
  getAgentRatingsByAgentId,
  getAgentRatings,
  getAgentsbyloc,
  getAgentsbyMandal,
  getAgentsbyDistrict
} = require("../controllers/agentController");

const agentRoutes = express.Router();


agentRoutes.post("/rating", insertAgentRatings);
agentRoutes.get("/getAgentRatingById", getAgentRatingsByAgentId);
agentRoutes.get("/getratings",getAgentRatings);
//agentRoutes.get('/getAgents/:role',getAgents);
agentRoutes.get("/getAgentsbyloc/:location/:userId", getAgentsbyloc);
agentRoutes.get('/getAgentsbyMandal/:location/:userId',getAgentsbyMandal);
agentRoutes.get('/getAgentsbyDistrict/:location/:userId',getAgentsbyDistrict);
module.exports = agentRoutes;
