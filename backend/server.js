const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

//GET backendserver.com/api/health
app.get("/api/health", (req,res) =>{
    res.json({
        success: true,
        message: "zinda hun bhyiiiiii"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});