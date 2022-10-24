const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {type: String, required: true}, 
    message: {type: String, required: true},
    imageURL: {type: String, default: null},
    like: {type: Number, default: 0},
    usersLiked: {type: [String]},
}, { timestamps: true });

module.exports = mongoose.model("Posts", postSchema)