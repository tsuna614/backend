const { log } = require("console");
const User = require("../models/user.model");
const path = require("path");
const fs = require("fs");
const { uploadImage } = require("../utils/cloudinary");
const uuid = require("uuid");

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.find({
        _id: id,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.find({
        email: email,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  createUser: async (req, res, hashPassword) => {
    try {
      // console.log(req.body.);

      const userData = {
        ...req.body,
        password: hashPassword,
      };
      const user = await User.create(userData);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  deleteUserByEmail: async (req, res) => {
    try {
      const email = req.params.email;
      await User.deleteMany({ email: email });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const id = req.params.id;
      await User.deleteOne({ _id: id });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });
      res.status(200).json("Updated successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // addFriend: async (req, res) => {
  //   try {
  //     const userId = req.params.id;
  //     const friendId = req.body.friendId;

  //     const user1 = await User.find({
  //       userId: userId,
  //     });
  //     await User.findOneAndUpdate(
  //       { userId: userId },
  //       {
  //         userFriends: [...user1[0].userFriends, friendId],
  //       },
  //       {
  //         new: true,
  //       }
  //     );

  //     const user2 = await User.find({
  //       userId: friendId,
  //     });
  //     await User.findOneAndUpdate(
  //       { userId: friendId },
  //       {
  //         userFriends: [...user2[0].userFriends, userId],
  //       },
  //       {
  //         new: true,
  //       }
  //     );
  //     res.status(200).json("Friend added successfully");
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  // removeFriend: async (req, res) => {
  //   try {
  //     const userId = req.params.id;
  //     const friendId = req.body.friendId;

  //     const user1 = await User.find({
  //       userId: userId,
  //     });
  //     await User.findOneAndUpdate(
  //       { userId: userId },
  //       {
  //         userFriends: user1[0].userFriends.filter(
  //           (friend) => friend !== friendId
  //         ),
  //       },
  //       {
  //         new: true,
  //       }
  //     );

  //     const user2 = await User.find({
  //       userId: friendId,
  //     });
  //     await User.findOneAndUpdate(
  //       { userId: friendId },
  //       {
  //         userFriends: user2[0].userFriends.filter(
  //           (friend) => friend !== userId
  //         ),
  //       },
  //       {
  //         new: true,
  //       }
  //     );
  //     res.status(200).json("Friend removed successfully");
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  uploadAvatar: async (req, res) => {
    try {
      //
      const image = req.file;
      const imageId = uuid.v4();
      const result = await uploadImage(image.path, imageId);
      fs.unlinkSync(image.path);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          profileImageUrl: result.secure_url,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        profileImageUrl: result.secure_url,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateAllUsers: async (req, res) => {
    try {
      await User.updateMany({}, req.body, {
        new: true,
      });
      res.status(200).json("Updated all users successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  toggleBookmark: async (req, res, next) => {
    try {
      const { userId, travelId } = req.body;
      const user = await User.findById(userId);
      if (user.bookmarkedTravels.includes(travelId)) {
        // remove travelId from bookmarkedTravels
        user.bookmarkedTravels = user.bookmarkedTravels.filter(
          (id) => id !== travelId
        );
      } else {
        user.bookmarkedTravels.push(travelId);
      }
      const result = await User.findByIdAndUpdate(userId, user, { new: true });
      res.status(200).json(result);
    } catch (error) {}
  },
  // Methods for JWT auth only
  getUserEmail: async (email) => {
    try {
      const data = await User.find({
        email: email,
      });
      return data;
    } catch {
      return null;
    }
  },
  updateRefreshToken: async (email, refreshToken) => {
    try {
      await User.findOneAndUpdate(
        { email: email },
        {
          refreshToken: refreshToken,
        },
        {
          new: true,
        }
      );
    } catch {
      return null;
    }
  },
};

module.exports = userController;
