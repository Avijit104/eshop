import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userData: null,
  role: "",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userData = action.payload.user;
      state.role = action.payload.role;
      console.log(state.role);
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
      console.log(state.role);
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.userData = null;
      console.log("this is logout");
      state.role = "";
    },
  },
});

export const { login, logout, updateUserData } = AuthSlice.actions;
export default AuthSlice.reducer;
