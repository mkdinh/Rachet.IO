// Import dependencies and routes
//--------------------------------------------------------
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API server routes
//--------------------------------------------------------
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
})

module.exports = router;