const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {type: String, required: true}, 
    message: {type: String, required: true},
    imageURL: {type: String, default: null},
    like: {type: Number},
    usersLiked: {type: [String]},

});

module.exports = mongoose.model("Posts", postSchema)