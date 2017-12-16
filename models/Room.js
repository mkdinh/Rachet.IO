// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const RoomSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    posts: {
        type: [Schema.Types.ObjectId],
        ref: "Post",
        require: false
    },

    occupancy: {
        type: Number,
        default: 0
    },

    created_timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create new model
//--------------------------------------------------------
const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;