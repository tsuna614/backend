const express = require('express');
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router.get('/getAllTours', tourController.getAllTours);

router.get('/getTourById/:id', tourController.getTourById);

router.post('/createTour', tourController.createTour);

router.put('/updateTourById/:id', tourController.updateTourById);

router.delete('/deleteTourById/:id', tourController.deleteTourById);

module.exports = router;