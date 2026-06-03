import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: null,
  role: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.userData = null;
    },
  },
});

export const { login, logout, updateUserData } = AuthSlice.actions;
export default AuthSlice.reducer;
