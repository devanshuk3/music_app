const mongoose = require("mongoose");

async function connectDB() {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("MongoDB connection error: MONGO_URI or MONGODB_URI is not defined");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;