import { call, put } from "redux-saga/effects";
import { coinApi } from "../../apis";

import {
  getCoinsSuccess,
  getCoinsError,
  getCoinsByCurrencySuccess,
  getCoinsByCurrencyError,
} from "../slices/coin.slice";

export function* getCoinsSaga(action: any): any {
  try {
    const data = yield call(coinApi.getCoins);

    if (data) {
      yield put(getCoinsSuccess(data.coins));
    }
  } catch (error) {
    yield put(getCoinsError(error));
  }
}

export function* getCoinsByCurrencySaga(action: any): any {
  try {
    const data = yield call(
      coinApi.getCoinsByCurrency,
      action.payload.currency
    );

    if (data) {
      console.log("coins: ", data.coins);
      yield put(getCoinsByCurrencySuccess(data.coins));
    }
  } catch (error) {
    yield put(getCoinsByCurrencyError(error));
  }
}
