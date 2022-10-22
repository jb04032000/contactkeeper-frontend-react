import { call, fork, put, takeLatest } from "redux-saga/effects";
import {
  getContactList,
  addContact,
  deleteContact,
  updateContact,
} from "../services/contacts.service";
import {
  getContactListRequested,
  getContactListFail,
  getContactListSuccess,
  addContactRequested,
  addContactFail,
  addContactSuccess,
  deleteContactRequested,
  deleteContactFail,
  deleteContactSuccess,
  updateContactRequested,
  updateContactFail,
  updateContactSuccess,
} from "../slices/contactSlice";

// worker for get contact List.
function* workerGetContactList(action) {
  try {
    const response = yield call(getContactList);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = res_body.data;
      yield put({
        type: getContactListSuccess,
        payload,
      });
    } else {
      yield put({
        type: getContactListFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: getContactListFail, message: err.message });
  }
}

// watch for get contact List.
function* watchGetContactList() {
  yield takeLatest(getContactListRequested, workerGetContactList);
}

// worker for add contact.
function* workerAddContact(action) {
  try {
    const response = yield call(addContact, action.payload);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = res_body.data;
      yield put({
        type: addContactSuccess,
        payload,
      });
    } else {
      yield put({
        type: addContactFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: addContactFail, message: err.message });
  }
}

// watch for add contact.
function* watchAddContact() {
  yield takeLatest(addContactRequested, workerAddContact);
}

// worker for delete contact.
function* workerDeleteContact(action) {
  try {
    const response = yield call(deleteContact, action.payload);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      yield put({
        type: deleteContactSuccess,
        payload: action.payload,
      });
    } else {
      yield put({
        type: deleteContactFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: deleteContactFail, message: err.message });
  }
}

// watch for delete contact.
function* watchDeleteContact() {
  yield takeLatest(deleteContactRequested, workerDeleteContact);
}

// worker for update contact.
function* workerUpdateContact(action) {
  try {
    const response = yield call(updateContact, action.payload);
    const res_body = response ? response : {};
    const res_status = res_body.success;

    if (res_status) {
      const payload = res_body.data;
      yield put({
        type: updateContactSuccess,
        payload,
      });
    } else {
      yield put({
        type: updateContactFail,
        payload: res_body,
      });
    }
  } catch (err) {
    yield put({ type: updateContactFail, message: err.message });
  }
}

// watch for update contact.
function* watchUpdateContact() {
  yield takeLatest(updateContactRequested, workerUpdateContact);
}

// running contact related sagas.
const contactSagas = [
  fork(watchGetContactList),
  fork(watchAddContact),
  fork(watchDeleteContact),
  fork(watchUpdateContact),
];

export default contactSagas;
