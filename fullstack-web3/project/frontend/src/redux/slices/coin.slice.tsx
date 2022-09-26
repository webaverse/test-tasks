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

type exchangeState = {
  coins: ICOIN[];
  coin: ICOIN;
  gettingCoins: boolean;
  gotCoins: boolean;
  gettingCoinsByCurrency: boolean;
  gotCoinsByCurrency: boolean;
  gettingExchange: boolean;
  gotExchange: boolean;
  error: object;
};

const initialState: exchangeState = {
  coins: [] as ICOIN[],
  coin: {} as ICOIN,
  gettingCoins: false,
  gotCoins: false,
  gettingCoinsByCurrency: false,
  gotCoinsByCurrency: false,
  gettingExchange: false,
  gotExchange: false,

  error: {},
};
const coinSlice = createSlice({
  name: "coins",
  initialState: initialState,
  reducers: {
    /**
     * get Coins
     */
    getCoins(state: exchangeState, action: PayloadAction<{}>) {
      state.gettingCoins = true;
      state.gotCoins = false;
    },
    getCoinsSuccess(
      state: exchangeState,
      action: PayloadAction<{ coins: ICOIN[] }>
    ) {
      state.gettingCoins = false;
      state.gotCoins = true;
      state.coins = action.payload.coins.map((coin: ICOIN, index: number) => ({
        index,
        ...coin,
      }));
    },
    getCoinsError(state: exchangeState, action) {
      state.gettingCoins = false;
      state.gotCoins = false;
      state.error = action.payload;
    },

    /**
     * get Coins by currency
     */
    getCoinsByCurrency(state: exchangeState, action: PayloadAction<{}>) {
      state.gettingCoinsByCurrency = true;
      state.gotCoinsByCurrency = false;
    },
    getCoinsByCurrencySuccess(
      state: exchangeState,
      action: PayloadAction<{ coins: ICOIN[] }>
    ) {
      state.gettingCoinsByCurrency = false;
      state.gotCoinsByCurrency = true;
      state.coins = action.payload.coins;
    },
    getCoinsByCurrencyError(state: exchangeState, action) {
      state.gettingCoinsByCurrency = false;
      state.gotCoinsByCurrency = false;
      state.error = action.payload;
    },

    /**
     * get cryptocurrency exchange
     */
    getExchange(state: exchangeState, action) {
      state.gettingExchange = true;
      state.gotExchange = false;
    },
    getExchangeSuccess(
      state: exchangeState,
      action: PayloadAction<{ index: number; exchange: string }>
    ) {
      state.gettingExchange = false;
      state.gotExchange = true;
      state.coins[action.payload.index].exchange = action.payload.exchange;
    },
    getExchangeError(state: exchangeState, action) {
      state.gettingExchange = false;
      state.gotExchange = false;
      state.error = action.payload;
    },
    sortCoinsByAny(state: exchangeState, action) {
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
