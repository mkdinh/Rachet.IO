// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const PollSchema = new Schema({
    title: {
        type: String,
        require: true
    },

    data: {
        type: Schema.Types.Mixed,
        default: []
    },

    type: {
        type: String,
        require: true
    },

    options: {
        type: Schema.Types.Mixed,
        default: {
            axisLabels: { x: "", y: "" },
            scale: { width: 0.75, height: 1.05, radius: 0.35, innerRadius: 0 },
            axes: true,
            grid: true
        }
    },

    created_timestamp: {
        type: Date,
        default: Date.now
    }
});

// Create new model
//--------------------------------------------------------
const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;