const mongoose = require("mongoose");

const likedSongSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    duration:{
        type: Number
    },
    uploader:{
        type: String
    },
    thumbnail:{
        type: String
    }
},{_id:false});

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    likedSongs:{
        type: [likedSongSchema],
        default: []
    }
},
{
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);


