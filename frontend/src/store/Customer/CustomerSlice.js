import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload.userData;
      console.log(state.userData);
    },
    unSetUserData: (state, action) => {
      state.userData = null;
    },
  },
});

export const { setUserData, unSetUserData } = CustomerSlice.actions;
export default CustomerSlice.reducer;
