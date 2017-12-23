// Import mongoose
//--------------------------------------------------------
const db = require("../models");

// Handle database requests
//--------------------------------------------------------
module.exports = {
    findAll: (req, res) => {
        db.Poll.find({})
        .sort({ created_timestamp: -1 })
        .then( data => res.json(data))
        .catch( err => console.log(err));
    },

    findOne: (req, res) => {
        db.Poll.findById(req.params.id)
        .then( data => res.json(data))
        .catch( err => console.log(err));
    },

    findActive: (req, res) => {
        db.Poll.find({})
        .then(data => {
            const active = data.filter(el => el.options.active)[0];
            res.json(active)
        })
    },

    createOne: (req, res) => {
        db.Poll.create(req.body)
        .then( doc => db.Poll.find({})
            .sort({ created_timestamp: -1 })
            .then(data => res.json(data))
            .catch(err => console.log(err)))
        .catch(err => console.log(err))
    },

    updateOne: (req, res) => {
        db.Poll.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then( doc => db.Poll.find({})
            .sort({ created_timestamp: -1 })
            .then(data => res.json(data))
            .catch(err => console.log(err)))
        .catch(err => console.log(err))
    },

    deleteOne: (req, res) => {
        db.Poll.findByIdAndRemove(req.params.id)
        .then( doc => db.Poll.find({})
            .sort({ created_timestamp: 1 })
            .then(data => res.json(data))
            .catch(err => console.log(err)))
        .catch(err => console.log(err))
    }
}