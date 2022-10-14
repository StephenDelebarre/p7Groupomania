const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {type: String, require: true}, 
    message: {type: String, require: true},
    imageURL: {type: String},
    like: {type: Number},
    usersLiked: {type: [String]},

});

module.exports = mongoose.model("Posts", postSchema)