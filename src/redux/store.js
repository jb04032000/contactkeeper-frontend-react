import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./slices";
import rootSaga from "./sagas";

const SagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare({
      serializableCheck: false,
      thunk: false,
    }).prepend(SagaMiddleware);
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});

SagaMiddleware.run(rootSaga);

export default store;
