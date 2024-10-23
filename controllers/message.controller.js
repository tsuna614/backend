const { get } = require("mongoose");
const Message = require("../models/message.model");

const messageController = {
  getAllMessages: async (req, res, next) => {
    try {
      const messages = await Message.find();
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  },
  getMessageById: async (req, res, next) => {
    try {
      const message = await Message.find({ conversationId: req.params.id });
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  },
  createMessage: async (req, res, next) => {
    try {
      await Message.create(req.body);
      res.status(200).json("Message created successfully");
    } catch (error) {
      next(error);
    }
  },
  updateMessageById: async (req, res, next) => {
    try {
      await Message.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json("Message updated successfully");
    } catch (error) {
      next(error);
    }
  },
  deleteMessageById: async (req, res, next) => {
    try {
      await Message.findByIdAndDelete(req.params.id);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = messageController;
