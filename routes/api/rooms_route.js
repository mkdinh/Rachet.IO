// Import dependencies
//--------------------------------------------------------
const router = require("express").Router();
const rooms_controller = require("../../controllers/rooms_controller");

// Handle HTTP request to server
//--------------------------------------------------------
router.route("/")
    .get(rooms_controller.findAll)
    .post(rooms_controller.createOne);

router.route("/:id")
    .get(rooms_controller.findOne)
    .delete(rooms_controller.deleteOne);

module.exports = router;

