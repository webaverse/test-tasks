import { call, put } from "redux-saga/effects";
import { coinApi } from "../../apis";

import { getCoinsSuccess, getCoinsError } from "../slices/coin.slice";

export function* getCoinsSaga(action: any): any {
  try {
    const data = yield call(coinApi.getCoins);

    if (data) {
      console.log("coins: ", data.coins);
      yield put(getCoinsSuccess(data.coins));
    }
  } catch (error) {
    yield put(getCoinsError(error));
  }
}
