// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const PointSchema = new Schema({
    color: {
        type: String,
        require: true
    },

    x: {
        type: Number,
        require: true
    },

    y: {
        type: Number,
        require: true
    },

    z: {
        type: Number,
        require: true
    },

    created_timestamp: {
        type: Date,
        require: true
    }
});

// Create new model
//--------------------------------------------------------
const Point = mongoose.model("Point", PointSchema);

module.exports = Point;