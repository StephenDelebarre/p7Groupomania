const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const postController = require("../controllers/post");

router.post("/", auth, multer, postController.createPost);
router.put("/:id", auth, multer, postController.modifyPost);
router.delete("/:id", auth, postController.deletePost);
router.get("/", auth, postController.getAllPosts);
router.post("/:id/like", auth, postController.likePost);


module.exports = router;