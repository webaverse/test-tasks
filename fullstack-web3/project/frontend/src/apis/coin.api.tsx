import { getClient } from "./coinStatsClient";

const coinStats_Api = "https://api.coinstats.app/public/v1";
const localServer_Api = "http://localhost:4000/";

const coinStatsClient = getClient(coinStats_Api || "");
const localClient = getClient(localServer_Api || "");

export const coinApi = {
  async getCoins() {
    try {
      const res = await coinStatsClient.get("/coins");
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getCoinsByCurrency(currency: string) {
    try {
      const res = await coinStatsClient.get(`/coins?currency=${currency}`);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getExchange(coinId: string, currency: string, symbol: string) {
    try {
      const res = await localClient.get(
        `/exchange-route?coinId=${coinId}&currency=${currency}&symbol=${symbol}`
      );
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
};
