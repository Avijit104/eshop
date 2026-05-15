import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userData: null,
  role: [],
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userData = action.payload.user;
      state.role = action.payload.role;
      console.log(action.payload.role);
      console.log(state.role, "user roles");
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.userData = null;
      state.role = "";
    },
  },
});

export const { login, logout, updateUserData } = AuthSlice.actions;
export default AuthSlice.reducer;
