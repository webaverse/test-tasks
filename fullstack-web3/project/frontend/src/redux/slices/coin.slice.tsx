import { createSlice } from "@reduxjs/toolkit";

export interface ICOIN {
  id?: string;
  icon?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  rank?: number;
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
  },
});

export const { getCoins, getCoinsSuccess, getCoinsError } = coinSlice.actions;

export default coinSlice.reducer;
