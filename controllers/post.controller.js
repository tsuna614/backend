const { Post } = require("../models/post.model");
const path = require("path");
const fs = require("fs");
const { uploadImage, uploadVideo, deleteItem } = require("../utils/cloudinary");
const uuid = require("uuid");

async function deleteCloudinaryItem(itemUrl, resourceType) {
  try {
    // const itemUrl = req.body.itemUrl;
    // const resourceType = req.body.resourceType;
    // const publicId = itemUrl.split("/").pop().split(".")[0];
    const publicId = itemUrl
      .split("/")
      .slice(-2)
      .join("/") // Handles if the item is in a folder
      .split(".")[0]; // Remove file extension
    console.log(publicId);

    const result = await deleteItem(publicId, resourceType);
  } catch (error) {
    console.log(error);
  }
}

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
  getPostById: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAllNormalPosts: async (req, res) => {
    try {
      const posts = await Post.find({
        rating: { $exists: false },
        postId: { $exists: false },
      });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getReviewPosts: async (req, res) => {
    try {
      const id = req.body.targetId;

      // Build the query
      const query = { rating: { $exists: true } };

      // If id is provided, add travelId condition
      if (id) {
        query.travelId = id;
      }

      const posts = await Post.find(query);
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getCommentPosts: async (req, res) => {
    try {
      const id = req.body.targetId;

      const query = { postId: { $exists: true } };

      if (id) {
        query.postId = id;
      }

      const posts = await Post.find(query);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createPost: async (req, res) => {
    try {
      const post = req.body;
      const result = await Post.create(post);
      console.log(result);
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
      console.log(id);
      const post = await Post.find({
        _id: id,
      });
      if (post) {
        if (post.imageUrl) {
          if (post.contentType === "video") {
            await deleteCloudinaryItem(post.imageUrl, "video");
          } else {
            await deleteCloudinaryItem(post.imageUrl, "image");
          }
        }
        await Post.deleteOne({ _id: id });
        res.status(200).json("Deleted successfully");
      } else {
        res.status(404).json("Post not found");
      }
    } catch (err) {
      console.log(err);
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
  uploadVideo: async (req, res) => {
    try {
      const video = req.file;
      const videoId = uuid.v4();
      const result = await uploadVideo(video.path, videoId);
      fs.unlinkSync(video.path);
      res.status(200).json({ videoUrl: result.secure_url });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteItem: async (req, res) => {
    try {
      const itemUrl = req.body.itemUrl;
      const resourceType = req.body.resourceType;
      // const publicId = itemUrl.split("/").pop().split(".")[0];
      const publicId = itemUrl
        .split("/")
        .slice(-2)
        .join("/") // Handles if the item is in a folder
        .split(".")[0]; // Remove file extension
      console.log(publicId);

      const result = await deleteItem(publicId, resourceType);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = postController;
