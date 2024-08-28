const { get } = require("mongoose");
const Tour = require("../models/tour.model");

const tourController = {
    getAllTours: async (req, res, next) => {
        try {
            const tours = await Tour.find();
            res.status(200).json(tours);
        } catch (error) {
            next(error);
        }
    },
    getTourById: async (req, res, next) => {
        try {
            const tour = await Tour.findById(req.params.id);
            res.status(200).json(tour);
        } catch (error) {
            next(error);
        }
    },
    createTour: async (req, res, next) => {
        try {
            console.log(req.body);
            
            const tour = await Tour.create(req.body);
            res.status(200).json("Tour created successfully");
        } catch (error) {
            next(error);
        }
    },
    updateTourById: async (req, res, next) => {
        try {
            const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json("Tour updated successfully");
        } catch (error) {
            next(error);
        }
    },
    deleteTourById: async (req, res, next) => {
        try {
            console.log(req.params.id);
            
            const tour = await Tour.findByIdAndDelete(req.params.id);
            res.status(200).json("Tour deleted successfully");
        } catch (error) {
            next(error);
        }
    },
}

module.exports = tourController;