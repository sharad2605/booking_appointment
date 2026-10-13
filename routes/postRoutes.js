
const express = require("express");
const router = express.Router();

const {
    createPost,
    getUserPosts
} = require("../controllers/postController");

router.post("/:userId/posts", createPost);
router.get("/:userId/posts", getUserPosts);

module.exports = router;