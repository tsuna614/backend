const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");

router.get("/", notificationController.getAllNotifications);

router.get("/:id", notificationController.getNotificationById);

router.get(
  "/getNotificationByReceiverId/:id",
  notificationController.getNotificationByReceiverId
);

router.post("/createNotification", notificationController.createNotification);

router.post(
  "/notificationResponse",
  notificationController.notificationResponse
);

router.put(
  "/updateNotificationById/:id",
  notificationController.updateNotificationById
);

router.delete(
  "/deleteNotificationById/:id",
  notificationController.deleteNotificationById
);

module.exports = router;
