// Import database and passport authentication
//--------------------------------------------------------
const db = require("../models");
const auth = require("../utils/passport");

// Configure PassportJS Strategy
//--------------------------------------------------------
auth.useLocal();
auth.serialize();
auth.deserialize();

// Defining methods
//--------------------------------------------------------
module.exports = {
    createOne: (req, res) => {
        db.User.create(req.body)
        .then(doc => res.json(doc))
        .catch(err => console.log(err));
    },

    login: (req, res) => {
        auth.authenticate(req, res, user => res.json(user));
    },

    logout: (req, res) => {
        req.logout();
        res.json({ message: "Successfully logged out" })
    }
}