// Import database model
//--------------------------------------------------------
const db = require("../models");

// Handle queries to database
//--------------------------------------------------------
module.exports = {
    findAll: (req, res) => {
        db.PowerPoint.find({}, "title created_timestamp")
        .sort({ create_timestamp: -1 })
        .then(db => res.json(db))
        .catch(err => console.log(err));
    },

    findOne: (req, res) => {    
        db.PowerPoint.findById(req.params.id)
        .then(doc => res.json(doc))
        .catch(err => console.log(err));
    },

    createOne: (req, res) => {
        db.PowerPoint.create(req.body)
        .then(doc => 
            db.PowerPoint.find({}, "title created_timestamp")
            .then(doc => res.json(doc))
            .catch(err => console.log(err)))
        .catch(err => console.log(err));
    },

    updateOne: (req, res) => {
        db.PowerPoint.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(doc => res.json(doc))
        .catch(err => console.log(err))
    },

    deleteOne: (req, res) => {     
        db.PowerPoint.findByIdAndRemove(req.params.id)
        .then(doc => 
            db.PowerPoint.find({})
            .then(doc => res.json(doc))
            .catch(err => console.log(err)))
        .catch(err => console.log(err));
    }
}