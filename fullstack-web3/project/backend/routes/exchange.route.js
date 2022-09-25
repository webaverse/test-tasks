// node_modules
const router = require("express").Router();

// controllers
const { ExchangeController } = require("../controllers");

router.get("/exchange-route", ExchangeController.getMiniCurrency);

module.exports = router;
