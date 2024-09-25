const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const upload = require("../middleware/multer.middleware");

router.get("/getAllPosts", postController.getAllPosts);

router.get("/getAllNormalPosts", postController.getAllNormalPosts);

router.get("/getAllReviewPosts", postController.getAllReviewPosts);

router.post("/createPost", postController.createPost);

router.put("/:id", postController.updatePostById);

router.delete("/:id", postController.deletePostById);

// for some reason "put" doesn't work
router.post("/likePost", postController.likePost);

router.post("/uploadImage", upload.single("image"), postController.uploadImage);

module.exports = router;
