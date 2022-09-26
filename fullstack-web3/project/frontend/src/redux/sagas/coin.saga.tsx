import { PayloadAction } from "@reduxjs/toolkit";
import { call, put } from "redux-saga/effects";
import { coinApi } from "../../apis";

import {
  getCoinsSuccess,
  getCoinsError,
  getCoinsByCurrencySuccess,
  getCoinsByCurrencyError,
  getExchangeSuccess,
  getExchangeError,
  ICOIN,
} from "../slices/coin.slice";

export function* getCoinsSaga(action: PayloadAction<{}>): any {
  try {
    const data = yield call(coinApi.getCoins);

    if (data) {
      yield put(getCoinsSuccess(data.coins));
    }
  } catch (error) {
    yield put(getCoinsError(error));
  }
}

export function* getCoinsByCurrencySaga(
  action: PayloadAction<{ currency: string }>
): any {
  try {
    const data = yield call(
      coinApi.getCoinsByCurrency,
      action.payload.currency
    );

    if (data) {
      // console.log("coins: ", data.coins);
      yield put(getCoinsByCurrencySuccess(data));
    }
  } catch (error) {
    yield put(getCoinsByCurrencyError(error));
  }
}

export function* getExchangeSaga(
  action: PayloadAction<{ coin: ICOIN; currency: string }>
): any {
  try {
    const data = yield call(
      coinApi.getExchange,
      action.payload.coin.id,
      action.payload.currency,
      action.payload.coin.symbol
    );

    if (data) {
      yield put(
        getExchangeSuccess({
          index: action.payload.coin.index,
          exchange: data.exchange,
        })
      );
    }
  } catch (error) {
    yield put(getExchangeError(error));
  }
}
