const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const youtubeRoutes = require("./routes/youtube");

const app = express();

// DATABASE
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api", youtubeRoutes);


// HEALTH CHECK
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running"
    });
});


// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});