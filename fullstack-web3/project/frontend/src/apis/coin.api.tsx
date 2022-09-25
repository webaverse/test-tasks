import { getClient } from "./coinStatsClient";

const coinStats_Api = "https://api.coinstats.app/public/v1";

const coinStatsClient = getClient(coinStats_Api || "");

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
};
