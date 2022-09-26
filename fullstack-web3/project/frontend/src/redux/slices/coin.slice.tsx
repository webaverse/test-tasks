import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

    error: {},
  },
  reducers: {
    /**
     * get Coins
     */
    getCoins(state, action: PayloadAction<{}>) {
      state.gettingCoins = true;
      state.gotCoins = false;
    },
    getCoinsSuccess(state, action: PayloadAction<{ coins: ICOIN[] }>) {
      state.gettingCoins = false;
      state.gotCoins = true;
      state.coins = action.payload.coins.map((coin: ICOIN, index: number) => ({
        index,
        ...coin,
      }));
    },
    getCoinsError(state, action) {
      state.gettingCoins = false;
      state.gotCoins = false;
      state.error = action.payload;
    },

    /**
     * get Coins by currency
     */
    getCoinsByCurrency(state, action: PayloadAction<{}>) {
      state.gettingCoinsByCurrency = true;
      state.gotCoinsByCurrency = false;
    },
    getCoinsByCurrencySuccess(
      state,
      action: PayloadAction<{ coins: ICOIN[] }>
    ) {
      state.gettingCoinsByCurrency = false;
      state.gotCoinsByCurrency = true;
      state.coins = action.payload.coins;
    },
    getCoinsByCurrencyError(state, action) {
      state.gettingCoinsByCurrency = false;
      state.gotCoinsByCurrency = false;
      state.error = action.payload;
    },

    /**
     * get cryptocurrency exchange
     */
    getExchange(state, action) {
      state.gettingExchange = true;
      state.gotExchange = false;
    },
    getExchangeSuccess(
      state,
      action: PayloadAction<{ index: number; exchange: string }>
    ) {
      state.gettingExchange = false;
      state.gotExchange = true;
      state.coins[action.payload.index].exchange = action.payload.exchange;
    },
    getExchangeError(state, action) {
      state.gettingExchange = false;
      state.gotExchange = false;
      state.error = action.payload;
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
