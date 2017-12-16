// Import dependencies
//--------------------------------------------------------
const router = require("express").Router();
const posts_controller = require("../../controllers/posts_controller");

// Handle HTTP requests to server
//--------------------------------------------------------
router.route("/:roomId")
    .post(posts_controller.createOne);

module.exports = router;