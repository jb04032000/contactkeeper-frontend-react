import { combineReducers } from "redux";
import contacts from "./contactSlice";
import auth from "./authSlice";

const reducer = combineReducers({
  contacts,
  auth,
});

export default reducer;
