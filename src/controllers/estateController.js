const { estateValidationSchema } = require("../helpers/estateValidation");
const estateModel = require("../models/estateModel");

// Add estate
const addEstate = async (req, res) => {
  try {
    const { userId, role } = req.user.user; // Ensure `req.user.user` has the right structure
    const data = {
      userId,
      role,
      ...req.body
    };

    console.log(req.body);

    // Await the result of validation
    const result = await estateValidationSchema.validateAsync(data);
    console.log(result);

    // Insert validated data into the model and save
    const insert = new estateModel(result);
    await insert.save();

    res.status(201).json("Estate added successfully");
  } catch (error) {
    if (error.isJoi) {
      console.error(error);
      return res.status(422).json({
        status: "error",
        message: error.details.map((detail) => detail.message).join(", ")
      });
    }

    console.error(error);
    return res.status(500).json("Internal server error");
  }
};


//get all estates
// Get all estates which are added by that user
const getClientEstates = async (req, res) => {
    try {
      const userId = req.user.user.userId;
      console.log(userId);
      const fields = await estateModel
        .find({ userId: userId })
        .sort({ updatedAt: -1 });
        console.log(fields);
      if (fields.length === 0) {
        return res.status(200).json([]);
      }
      res.status(200).json(fields);
    } catch (error) {
      res.status(500).json({ message: "Error fetching estates", error });
    }
  };


  //get all estates
  const getAllEstates = async (req, res) => {
    try {
      
      const fields = await estateModel
        .find()
        .sort({ updatedAt: -1 });
        console.log(fields);
      if (fields.length === 0) {
        return res.status(200).json([]);
      }
      res.status(200).json(fields);
    } catch (error) {
      res.status(500).json({ message: "Error fetching estates", error });
    }
  };

  
module.exports = { addEstate, getClientEstates, getAllEstates };
