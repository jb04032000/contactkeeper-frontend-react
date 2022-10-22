import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../../utils/setAuthToken";

const name = "auth";
const initialState = {
  token: localStorage.getItem("contactKeeperToken") || "",
  isAuthenticated: localStorage.getItem("contactKeeperToken") ? true : false,
  message: "",
  error: "",
  loading: false,
  user: [],
};

const registerUserOperations = {
  registerUserRequested: (state) => {
    state.loading = true;
  },
  registerUserFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = [];
    state.token = null;
    state.error = action.payload;
    localStorage.removeItem("contactKeeperToken");
  },
  registerUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.token = action.payload.token;
    localStorage.setItem("contactKeeperToken", action.payload.token);
  },
};

const loadUserOperations = {
  loadUserRequested: registerUserOperations.registerUserRequested,
  loadUserFail: registerUserOperations.registerUserFail,
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
};

const loginUserOperations = {
  loginUserRequested: registerUserOperations.registerUserRequested,
  loginUserFail: registerUserOperations.registerUserFail,
  loginUserSuccess: registerUserOperations.registerUserSuccess,
};

export const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    ...registerUserOperations,
    ...loadUserOperations,
    ...loginUserOperations,
    logOut: (state) => {
      setAuthToken(false);
      localStorage.removeItem("contactKeeperToken");
      state = { ...initialState };
    },
    clearError: (state) => {
      state.error = "";
    },
  },
});

export const {
  registerUserFail,
  registerUserRequested,
  registerUserSuccess,
  loadUserRequested,
  loadUserFail,
  loadUserSuccess,
  clearError,
  logOut,
  loginUserRequested,
  loginUserFail,
  loginUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
