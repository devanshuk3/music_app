const mongoose = require("mongoose");

async function connectDB(){
    const mongoUri = process.env.MONGO_URI;
    if(!mongoUri){
        console.error("Missing MongoDB credentials. Set MONGO_URI in your environment.");
        process.exit(1);
    }

    try{
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;