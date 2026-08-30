const express = require("express");

const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();


// GET ALL LIKED SONGS
router.get("/liked", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        res.json({
            success: true,
            songs: user.likedSongs
        });

    } catch (error) {
        console.error("Get liked songs error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


// LIKE A SONG
router.post("/like", auth, async (req, res) => {
    try {
        const song = req.body;

        if (!song.id || !song.title) {
            return res.status(400).json({
                success: false,
                message: "Song id and title are required"
            });
        }

        const user = await User.findById(req.userId);

        const alreadyLiked = user.likedSongs.some(
            item => item.id === song.id
        );

        if (alreadyLiked) {
            return res.status(400).json({
                success: false,
                message: "Song already liked"
            });
        }

        user.likedSongs.push({
            id: song.id,
            title: song.title,
            url: song.url,
            duration: song.duration,
            uploader: song.uploader,
            thumbnail: song.thumbnail
        });

        await user.save();

        res.json({
            success: true,
            message: "Song added to liked songs"
        });

    } catch (error) {
        console.error("Like song error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


// UNLIKE A SONG
router.delete("/like/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const oldLength = user.likedSongs.length;

        user.likedSongs = user.likedSongs.filter(
            song => song.id !== req.params.id
        );

        if (user.likedSongs.length === oldLength) {
            return res.status(404).json({
                success: false,
                message: "Song not found in liked songs"
            });
        }

        await user.save();

        res.json({
            success: true,
            message: "Song removed from liked songs"
        });

    } catch (error) {
        console.error("Unlike song error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


// CHECK IF SONG IS LIKED
router.get("/liked/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        const liked = user.likedSongs.some(
            song => song.id === req.params.id
        );

        res.json({
            success: true,
            liked
        });

    } catch (error) {
        console.error("Check liked song error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


module.exports = router;