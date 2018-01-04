// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const PowerPointSchema = new Schema({
    title: {
        type: String,
        require: true
    },

    slides: {
        type: Schema.Types.Mixed,
        default: []
    },

    cSlide: {
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
const PowerPoint = mongoose.model("PowerPoint", PowerPointSchema);

module.exports = PowerPoint;