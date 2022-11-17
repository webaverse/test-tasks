//node_modules
import { all, takeLatest, takeEvery } from "redux-saga/effects";

//sagas
import {
  getCoinsSaga,
  getCoinsByCurrencySaga,
  getExchangeSaga,
} from "./coin.saga";

//slices
import {
  getCoins,
  getCoinsByCurrency,
  getExchange,
} from "../slices/coin.slice";

//sagas
function* rootSaga() {
  yield all([takeLatest(getCoins.type, getCoinsSaga)]);
  yield all([takeLatest(getCoinsByCurrency.type, getCoinsByCurrencySaga)]);
  yield all([takeEvery(getExchange.type, getExchangeSaga)]);
}

export default rootSaga;
