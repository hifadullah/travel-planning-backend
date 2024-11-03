import Tour from "../models/Tour.js";

const API_URL = 'http://localhost:4000/api/v1';

// Function to get tours
export const getTours = async () => {
  try {
    // Making a GET request to the /tours endpoint
    const response = await axios.get(`${API_URL}/tours`);
    // Returning the data from the response
    return response.data;
  } catch (error) {
    // Logging any errors that occur
    console.error('Error fetching tours:', error);
  }
};


// create new tour
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create tour" });
  }
};

// update tour
export const updateTour = async(req, res) => {
  const id = req.params.id;
  try {
    const updatedTour = await Tour.findByIdAndUpdate(id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update tour" });
  }
};


// Delete tour
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
   
    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};
// get single tour
export const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      success: true,
      message: "Tour retrieved successfully",
      data: tour,
    });
    
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: "Failed to get the tour" });
  }
};

// get all tours
export const getAllTour = async (req, res) => {
  try {
    const tour = await Tour.find({})
    
    res.status(200).json({
      success: true,
      message: "Tours retrieved successfully",
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Failed to get tours"
   });
  }
};

//get tour by search 
export const getTourBySearch = async(requ,res)=>{


    const city = new RegExp( req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

  try { 

    const tours = await Tour.find({ city, distance:{gte:distance}
    maxGroupSize:{$gte:maxGroupSize} })

    res.statuss(200).json({
        success: true,
        message: "successful",
        data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not founf"
   });
  }
  

    
  

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(8);
    res.status(200).json({
      success: true,
      message: "Tours retrieved successfully",
      data: tours,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get tours" });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      message: "Tours count successfully",
      data: tourCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to get tours count" });
  }
};

export default {
  createTour,
  deleteTour,
  updateTour,
  getSingleTour,
  getAllTour,
  getFeaturedTour,
  getTourCount,
};
