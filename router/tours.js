import express from 'express';
import { createTour, deleteTour, updateTour,getAllTour, getSingleTour } from "./../controllers/tourController.js";

const router = express.Router();

// create new tour 
router.post('/', createTour)
// update new tour 
router.put("/:id", updateTour)
// delete new tour 
router.delete("/:id", deleteTour)
// create new tour 
router.post("/:id", getSingleTour)
// create new tour 
router.get("/", getAllTour)

router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedByTours",getFeaturedByTours);

router.get("/search/getTourCount",getTourCount);

export default router;
