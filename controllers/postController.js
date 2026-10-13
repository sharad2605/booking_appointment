
const { User, Post } = require("../models/association");

// Create a post for a user
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.params.userId;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const post = await Post.create({
            title,
            content,
            userId
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating post",
            error: error.message
        });
    }
};

// Get a user and all their posts
exports.getUserPosts = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: [Post]
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });
    }
};