const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middleware/multer.middleware");
const fs = require("fs");

router.get("/", postController.getAllPosts);

// this is the post methods, because get method with a body does not work on web (it works on postman and mobile though)
// might as well change it for getAllNormalPosts to match the call in the front end
router.get("/getAllNormalPosts", postController.getAllNormalPosts);

router.get("/getReviewPosts", postController.getReviewPosts);

router.get("/getCommentPosts", postController.getCommentPosts);

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
