import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userId: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userId = action.payload;
      console.log("store", state.userId);
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.userId = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
