// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const PostSchema = new Schema({
    message: {
        type: String,
        require: true
    },

    roomId: {
        type: String,
        require: true
    },

    created_by: {
        type: String,
        require: true
    },

    created_timestamp: {
        type: Date,
        require: true
    }
});

// Create new model
//--------------------------------------------------------
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;