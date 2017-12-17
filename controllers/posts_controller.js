// import database
//--------------------------------------------------------
const db = require("../models");

// handle database query
module.exports = {
    createOne: (req, res) => {
        let newPost = new db.Post(req.body);
        newPost.save()
        .then(post => db.Room.findOneAndUpdate({_id: post.roomId}, {$push: {posts: post._id} }, {new: true})
            .populate({path: "posts", model: "Post"})
            .then(doc => res.json(doc))
            .catch(err => console.log(err)))
        .catch(err => console.log(err));
    }
}