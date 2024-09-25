const { Post } = require("../models/post.model");
const path = require("path");
const fs = require("fs");
const { uploadImage } = require("../utils/cloudinary");
const uuid = require("uuid");
const { get } = require("http");

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
  getAllNormalPosts: async (req, res) => {
    try {
      const posts = await Post.find({ rating: { $exists: false } });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getAllReviewPosts: async (req, res) => {
    try {
      const posts = await Post.find({ rating: { $exists: true } });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createPost: async (req, res) => {
    try {
      const post = req.body;
      const result = await Post.create(post);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  updatePostById: async (req, res) => {
    try {
      const postId = req.params.id;
      const post = req.body;
    } catch (error) {}
  },
  deletePostById: async (req, res) => {
    try {
      const id = req.params.id;
      await Post.deleteOne({ _id: id });
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const postId = req.body.postId;
      const userId = req.body.userId;
      const post = await Post.findById(postId);
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((id) => id !== userId);
      } else {
        post.likes.push(userId);
      }
      const result = await Post.findByIdAndUpdate(postId, post, { new: true });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  uploadImage: async (req, res) => {
    try {
      //
      const image = req.file;
      const imageId = uuid.v4();
      const result = await uploadImage(image.path, imageId);
      fs.unlinkSync(image.path);
      res.status(200).json({
        imageUrl: result.secure_url,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = postController;
