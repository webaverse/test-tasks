//node_modules
import { all, takeLatest } from "redux-saga/effects";

//sagas
import { getCoinsSaga } from "./coin.saga";

//slices
import { getCoins } from "../slices/coin.slice";

//sagas
function* rootSaga() {
  yield all([takeLatest(getCoins.type, getCoinsSaga)]);
}

export default rootSaga;
