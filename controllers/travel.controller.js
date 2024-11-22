const { get } = require("mongoose");
const Travel = require("../models/travel.model");
const { Post } = require("../models/post.model");

async function calculateRating(travelId) {
  let rating = 0;
  const reviewPostList = await Post.find({
    travelId: travelId,
    rating: { $exists: true },
  });
  if (reviewPostList.length === 0) {
    return 0;
  }
  reviewPostList.forEach((post) => {
    rating += post.rating;
  });
  return rating / reviewPostList.length;
}

const travelController = {
  getAllTravels: async (req, res, next) => {
    try {
      const travels = await Travel.find();
      // for every travel object, calculate its rating by looking in the post collection
      // where travelId matches with that travel object's _id
      for (const travel of travels) {
        const rating = await calculateRating(travel._id);
        travel.rating = rating;
      }
      res.status(200).json(travels);
    } catch (error) {
      next(error);
    }
  },
  getTravelById: async (req, res, next) => {
    try {
      const travel = await Travel.findById(req.params.id);
      res.status(200).json(travel[0]);
    } catch (error) {
      next(error);
    }
  },
  createTravel: async (req, res, next) => {
    try {
      console.log(req.body);

      const travel = await Travel.create(req.body);
      res.status(200).json("Travel created successfully");
    } catch (error) {
      next(error);
    }
  },
  updateTravelById: async (req, res, next) => {
    try {
      const travel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json("Travel updated successfully");
    } catch (error) {
      next(error);
    }
  },
  deleteTravelById: async (req, res, next) => {
    try {
      console.log(req.params.id);

      const travel = await Travel.findByIdAndDelete(req.params.id);
      res.status(200).json("Travel deleted successfully");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = travelController;
