import { all } from "redux-saga/effects";
import authSagas from "./authSaga";
import contactsSaga from "./contactsSaga";

export default function* rootSaga() {
  yield all([...contactsSaga, ...authSagas]);
}
