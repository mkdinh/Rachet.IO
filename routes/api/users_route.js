// Import express router
//--------------------------------------------------------
const router = require("express").Router();
const users_controller = require("../../controllers/users_controller");

// define HTTP routes
//--------------------------------------------------------
router.route("/")  
    .post(users_controller.createOne);

router.route("/login")
    .post(users_controller.login);

router.route("/logout")
    .get(users_controller.logout);

module.exports = router;