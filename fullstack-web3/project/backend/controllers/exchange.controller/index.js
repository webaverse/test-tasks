//node_modules
const { validationResult } = require("express-validator");

// services
const { ExchangeService } = require("../../services");

// consts
const { ERRORS } = require("../../consts");

// utils
const { errorHandler, RESPONSE } = require("../../utils");

const getMiniCurrency = async (req, res, next) => {
  try {

    const { coinId, currency, symbol, ...rest } = req.query;

    if (!currency) { errorHandler(res, ERRORS.BAD_REQUEST.code); return };

    if (coinId) {
      const result = await ExchangeService.getCoinsByCurrency(coinId, currency);

      let exchanges = result.filter(item => item.pair == `${symbol}/USD` || item.pair == `${symbol}/USDT`);
      if (exchanges.length !== 0) {
        exchanges.sort((e1, e2) => e1.price - e2.price);
      } else {
        exchanges = result;
        exchanges.sort((e1, e2) => e1.price - e2.price);
      }

      RESPONSE(res, 200, { exchange: exchanges[0] ? exchanges[0].exchange : "" }, "Get Currency successfully");
    } else {
      let data = [];
      const result = await ExchangeService.getCoins(currency);

      await Promise.all(result).then(async (value) => {

        for (let i = 0; i < value.length; i++) {
          const res = await ExchangeService.getCoinsByCurrency(value[i].id, currency);

          let exchanges = res.filter(item => item.pair == `${value[i].symbol}/USDT`);
          exchanges.sort((a, b) => a.price - b.price);

          let coin = { coinId: value[i].id, exchange: exchanges[0] ? exchanges[0].exchange : exchanges[0] };
          data.push(coin);
        }
      });

      RESPONSE(res, 200, { Allexchange: data }, "Get Currency successfully");
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getMiniCurrency,
};
