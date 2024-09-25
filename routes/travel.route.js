const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travel.controller");

router.get("/getAllTravels", travelController.getAllTravels);

router.get("/getTravelById/:id", travelController.getTravelById);

router.post("/createTravel", travelController.createTravel);

router.put("/updateTravelById/:id", travelController.updateTravelById);

router.delete("/deleteTravelById/:id", travelController.deleteTravelById);

router.get("/processTravelBooking", (req, res, next) => {
  console.log("Processing Travel booking");
  res.status(200).json("Processed Travel booking");
});

module.exports = router;
