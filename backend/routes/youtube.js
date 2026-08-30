const express = require("express");

const {
    getAudioUrl,
    searchYoutube
} = require("../ytdlp");

const router = express.Router();

t
// GET AUDIO URL
router.post("/url", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({
            success: false,
            message: "URL is required"
        });
    }

    try {
        const result = await getAudioUrl(url);

        res.json({
            success: true,
            result
        });

    } catch (error) {
        console.error("Error in /url:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// SEARCH YOUTUBE
router.post("/search", async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({
            success: false,
            message: "Query is required"
        });
    }

    try {
        const results = await searchYoutube(query);

        res.json({
            success: true,
            results
        });

    } catch (error) {
        console.error("Error in /search:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;