import { createSlice } from "@reduxjs/toolkit";

export interface ICOIN {
  index?: number;
  id: string;
  icon: string;
  name: string;
  symbol: string;
  decimals?: number;
  rank: number;
  price?: number;
  priceBtc?: number;
  volume?: number;
  marketCap?: number;
  availableSupply?: number;
  totalSupply?: number;
  priceChange1h?: number;
  priceChange1d?: number;
  priceChange1w?: number;
  contractAddress?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  exp?: any;
  exchange?: string;
}

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [] as ICOIN[],
    coin: {} as ICOIN,
    gettingCoins: false,
    gotCoins: false,
    gettingCoinsByCurrency: false,
    gotCoinsByCurrency: false,
    gettingExchange: false,
    gotExchange: false,
  },
  reducers: {
    /**
     * get Coins
     */
    getCoins(state, action) {
      state.gettingCoins = true;
      state.gotCoins = false;
    },
    getCoinsSuccess(state, action) {
      state.gettingCoins = false;
      state.gotCoins = true;
      state.coins = action.payload.map((coin: ICOIN, index: number) => ({
        index,
        ...coin,
      }));
    },
    getCoinsError(state, action) {
      state.gettingCoins = false;
      state.gotCoins = false;
    },

    /**
     * get Coins by currency
     */
    getCoinsByCurrency(state, action) {
      state.gettingCoinsByCurrency = true;
      state.gotCoinsByCurrency = false;
    },
    getCoinsByCurrencySuccess(state, action) {
      state.gettingCoinsByCurrency = false;
      state.gotCoinsByCurrency = true;
      state.coins = action.payload;
    },
    getCoinsByCurrencyError(state, action) {
      state.gettingCoinsByCurrency = false;
      state.gotCoinsByCurrency = false;
    },

    /**
     * get cryptocurrency exchange
     */
    getExchange(state, action) {
      state.gettingExchange = true;
      state.gotExchange = false;
    },
    getExchangeSuccess(state, action) {
      state.gettingExchange = false;
      state.gotExchange = true;
      state.coins[action.payload.index].exchange = action.payload.exchange;
    },
    getExchangeError(state, action) {
      state.gettingExchange = false;
      state.gotExchange = false;
    },
    sortCoinsByAny(state, action) {
      state.coins.sort(action.payload.func);
    },
  },
});

export const {
  getCoins,
  getCoinsSuccess,
  getCoinsError,
  getCoinsByCurrency,
  getCoinsByCurrencySuccess,
  getCoinsByCurrencyError,
  sortCoinsByAny,
  getExchange,
  getExchangeSuccess,
  getExchangeError,
} = coinSlice.actions;

export default coinSlice.reducer;
