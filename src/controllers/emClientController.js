const emFieldModel = require("../models/emFieldModel");
const emInterestModel = require("../models/emInterestModel");
const userModel = require("../models/userModel");

const getInterestedAgents = async (req, res) => {
    try {
      const userId = req.user.user.userId;
      const lands = await emFieldModel.find({ userId: userId });
      const estIds = lands.map((field) => field._id.toString());
      let result = [];
  
      for (let estId of estIds) {
        const interests = await emInterestModel.find({ estId: estId });
        
        for (let interest of interests) {
          const agentId = interest.userId;
          const agentDetails = await userModel.findOne({ _id: agentId }); // Use `findOne` for a single document
          
          if (agentDetails) {
            // Add agent details to the interest object
            result.push({
              ...interest.toObject(), // Convert Mongoose document to plain object if needed
              agentDetails
            });
          }
        }
      }
  
      res.status(200).json(result);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json("Internal server error");
    }
  };


  //get all agents
  const getAllAgents = async(req,res) => {
    try{
      const fields = 'firstName lastName role phoneNumber profilePicture email city mandal district pinCode';
    const agents = await userModel.find({role:1}).select(fields);
    if(agents.length === 0){
    res.status(404).json("Agents not found");
    }
    res.status(200).json(agents);
    }
    catch(error){
    res.status(500).json("Internal server error");
    }
    }

  module.exports = {getInterestedAgents, getAllAgents}
  