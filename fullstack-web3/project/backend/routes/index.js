// node_modules
const router = require("express").Router();

// sub routes
const exchangeRoute = require("./exchange.route");

router.use("/", exchangeRoute);

module.exports = router;
