const { get } = require("mongoose");
const Notification = require("../models/notification.model");
const userController = require("../controllers/user.controller");

const notificationController = {
  getAllNotifications: async (req, res, next) => {
    try {
      const notifications = await Notification.find();
      res.status(200).json(notifications);
    } catch (error) {
      next(error);
    }
  },
  getNotificationById: async (req, res, next) => {
    try {
      const notification = await Notification.find({
        conversationId: req.params.id,
      });
      res.status(200).json(notification[0]);
    } catch (error) {
      next(error);
    }
  },
  getNotificationByReceiverId: async (req, res, next) => {
    try {
      const notification = await Notification.find({
        receiver: req.params.id,
      });
      res.status(200).json(notification[0]);
    } catch (error) {
      next(error);
    }
  },
  createNotification: async (req, res, next) => {
    try {
      await Notification.create(req.body);
      res.status(200).json("Notification created successfully");
    } catch (error) {
      next(error);
    }
  },
  notificationResponse: async (req, res, next) => {
    try {
      const { notificationId, receiverResponse } = req.body;

      // Check if the notification exists
      const notification = await Notification.findById(notificationId);

      if (!notification) {
        // If notification doesn't exist, send an error response
        return res.status(404).json({ message: "Notification not found" });
      }

      if (receiverResponse === "accept") {
        // Create a mock request object for addFriend
        const addFriendReq = {
          params: { id: notification.receiver }, // receiver is the user who accepts the request
          body: { targetId: notification.sender }, // sender is the one who sent the friend request
        };

        // Call addFriend method with mock req and original res
        await userController.addFriend(addFriendReq, res);
      }

      // Delete the notification
      await Notification.findByIdAndDelete(notificationId);

      res.status(200).json("Notification handled successfully");
    } catch (error) {
      next(error);
    }
  },
  updateNotificationById: async (req, res, next) => {
    try {
      await Notification.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json("Notification updated successfully");
    } catch (error) {
      next(error);
    }
  },
  deleteNotificationById: async (req, res, next) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = notificationController;
