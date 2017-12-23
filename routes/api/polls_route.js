// Import dependencies
//--------------------------------------------------------
const router = require("express").Router();
const polls_controller = require("../../controllers/polls_controller");

// Handle server HTTP request
//--------------------------------------------------------
router.route("/")
    .get(polls_controller.findAll)
    .post(polls_controller.createOne);

router.route("/active")
    .get(polls_controller.findActive);

router.route("/:id")
    .get(polls_controller.findOne)
    .put(polls_controller.updateOne)
    .delete(polls_controller.deleteOne);

module.exports = router;