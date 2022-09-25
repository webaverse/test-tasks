//node_modules
import { all, takeLatest } from "redux-saga/effects";

//sagas
import { getCoinsSaga, getCoinsByCurrencySaga } from "./coin.saga";

//slices
import { getCoins, getCoinsByCurrency } from "../slices/coin.slice";

//sagas
function* rootSaga() {
  yield all([takeLatest(getCoins.type, getCoinsSaga)]);
  yield all([takeLatest(getCoinsByCurrency.type, getCoinsByCurrencySaga)]);
}

export default rootSaga;
