// Import server routes
//--------------------------------------------------------
const router = require("express").Router();
const users = require("./users_route");
const posts = require("./posts_route");
const rooms = require("./rooms_route");
const polls = require("./polls_route");
const powerpoints = require("./powerpoints_route");

// apply routes to midwares
//--------------------------------------------------------
router.use("/users", users);
router.use("/posts", posts);
router.use("/rooms", rooms);
router.use("/polls", polls);
router.use("/powerpoints", powerpoints)

module.exports = router;