// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const PollSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    data: {
        type: Schema.Types.Mixed,
        require: true
    },

    type: {
        type: String,
        require: true
    },

    created_by: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

// Create new model
//--------------------------------------------------------
const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;