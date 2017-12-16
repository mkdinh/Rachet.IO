// Import database model
//--------------------------------------------------------
const db = require("../models");

// Handle queries to database
//--------------------------------------------------------
module.exports = {
    findAll: (req, res) => {
        db.Room.find({})
        .sort({ create_timestamp: -1 })
        .then(db => res.json(db))
        .catch(err => console.log(err));
    },

    findOne: (req, res) => {    
        db.Room.findById(req.params.id)
        .populate({path: "posts", model: "Post"})
        .slice("posts", -15)
        .then(doc => res.json(doc))
        .catch(err => console.log(err));
    },

    createOne: (req, res) => {
        db.Room.create(req.body)
        .then(doc => 
            db.Room.find({})
            .then(doc => res.json(doc))
            .catch(err => console.log(err)))
    },

    deleteOne: (req, res) => {
        console.log(req.body)
        
        db.Room.findByIdAndRemove(req.params.id)
        .then(doc => 
            db.Room.find({})
            .then(doc => res.json(doc))
            .catch(err => console.log(err)))
    }
}