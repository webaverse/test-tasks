import { createSlice } from "@reduxjs/toolkit";

export interface ICOIN {
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
      state.coins = action.payload;
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
} = coinSlice.actions;

export default coinSlice.reducer;
