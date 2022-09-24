//node_modules
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

//sagas
import rootSaga from "./sagas";

//slices
import { loadingSlice, coinSlice } from "./slices";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  loading: loadingSlice,
  coin: coinSlice,
});

export const store = configureStore({
  preloadedState: {},
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(
      sagaMiddleware
    ),
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
