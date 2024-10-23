const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.get("/", messageController.getAllMessages);

router.get("/:id", messageController.getMessageById);

router.post("/createMessage", messageController.createMessage);

router.put("/updateMessageById/:id", messageController.updateMessageById);

router.delete("/deleteMessageById/:id", messageController.deleteMessageById);

module.exports = router;
