import { call, fork, put, takeLatest } from "redux-saga/effects";
import setAuthToken from "../../utils/setAuthToken";
import { registerNewUser, loadUser, loginUser } from "../services/auth.service";
import {
  registerUserRequested,
  registerUserFail,
  registerUserSuccess,
  loadUserRequested,
  loadUserFail,
  loadUserSuccess,
  loginUserRequested,
  loginUserFail,
  loginUserSuccess,
} from "../slices/authSlice";

// worker for register user.
function* workerRegisterUser(action) {
  try {
    const response = yield call(registerNewUser, action.payload);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = res_body.data;
      yield put({
        type: registerUserSuccess,
        payload,
      });
    } else {
      yield put({
        type: registerUserFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: registerUserFail, message: err.message });
  }
}

// watch for register user.
function* watchRegisterUser() {
  yield takeLatest(registerUserRequested, workerRegisterUser);
}

// worker for loadUser user.
function* workerLoadUser() {
  if (localStorage.contactKeeperToken) {
    setAuthToken(localStorage.contactKeeperToken);
  }
  try {
    const response = yield call(loadUser);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = res_body.data;
      yield put({
        type: loadUserSuccess,
        payload,
      });
    } else {
      yield put({
        type: loadUserFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: loadUserFail, message: err.message });
  }
}

// watch for Load User.
function* watchLoadUser() {
  yield takeLatest(loadUserRequested, workerLoadUser);
}

function* workerLoginUser(action) {
  try {
    const response = yield call(loginUser, action.payload);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = res_body.data;
      yield put({
        type: loginUserSuccess,
        payload,
      });
    } else {
      yield put({
        type: loginUserFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: loginUserFail, message: err.message });
  }
}

// watch for Login User.
function* watchLoginUser() {
  yield takeLatest(loginUserRequested, workerLoginUser);
}

// running auth related sagas.
const authSagas = [
  fork(watchRegisterUser),
  fork(watchLoadUser),
  fork(watchLoginUser),
];

export default authSagas;
