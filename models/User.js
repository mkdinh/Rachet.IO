// Import mongoose
//--------------------------------------------------------
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create new User Schema
//--------------------------------------------------------
const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    name: {
        type: String,
        require: true
    },

    privilege: {
        type: Number,
        require: true
    }
});

// Create new model
//--------------------------------------------------------
const User = mongoose.model("User", UserSchema);

module.exports = User;