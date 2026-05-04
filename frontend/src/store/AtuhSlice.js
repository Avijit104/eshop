import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userData: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      console.log("this is logout");
      state.userData = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
