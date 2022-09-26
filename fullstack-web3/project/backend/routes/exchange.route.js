// node_modules
const router = require("express").Router();

// controllers
const { ExchangeController } = require("../controllers");

//validators
const { exchangeValidator } = require("../validators")

router.get("/exchange-route", ExchangeController.getMiniCurrency);

module.exports = router;
