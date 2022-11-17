//node_modules
const axios = require("axios");

const getCoinsByCurrency = async (coinId, currency) => {
  try {
    const result = await axios.get(`https://api.coinstats.app/public/v1/markets?coinId=${coinId}&currency=${currency}`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

const getCoins = async (currency) => {
  try {
    const result = await axios.get(`https://api.coinstats.app/public/v1/coins?currency=${currency}`);
    return result.data.coins;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCoinsByCurrency,
  getCoins
};
