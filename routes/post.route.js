const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middleware/multer.middleware");
const fs = require("fs");

router.get("/", postController.getAllPosts);

router.get("/getAllNormalPosts", postController.getAllNormalPosts);

// this is the post methods, because get method with a body does not work on web (it works on postman and mobile though)
router.post("/getReviewPosts", postController.getReviewPosts);
router.post("/getCommentPosts", postController.getCommentPosts);

router.get("/:id", postController.getPostById);

router.post("/createPost", postController.createPost);

router.put("/:id", postController.updatePostById);

router.delete("/:id", postController.deletePostById);

// for some reason "put" doesn't work
router.post("/likePost", postController.likePost);

router.post("/uploadImage", upload.single("image"), postController.uploadImage);

router.post("/uploadVideo", upload.single("video"), postController.uploadVideo);

router.post("/deleteItem", postController.deleteItem);

module.exports = router;
