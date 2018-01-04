// Import dependencies
//--------------------------------------------------------
const router = require("express").Router();
const powerpoints_controller = require("../../controllers/powerpoints_controller");

// Handle HTTP request to server
//--------------------------------------------------------
router.route("/")
    .get(powerpoints_controller.findAll)
    .post(powerpoints_controller.createOne);

router.route("/:id")
    .get(powerpoints_controller.findOne)
    .put(powerpoints_controller.updateOne)
    .delete(powerpoints_controller.deleteOne);

module.exports = router;

