const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rachet", 
    {
        useMongoClient: true
    }
);

const userSeed = {
    email: "guest@sample.com",
    password: "password",
    name: "Guest",
    privilege: 3,
};


db.User.create(userSeed)
    .then(data => {
        console.log("new user record inserted")
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
