// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const PowerPointSchema = new Schema({
    name: {
        type: String,
        require: true
    },

    data: {
        type: Schema.Types.Mixed,
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
const PowerPoint = mongoose.model("PowerPoint", PowerPointSchema);

module.exports = PowerPoint;