import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAddress: null,
};

const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setuserAddress: (state, action) => {
      state.userAddress = action.payload;
      console.log("from slice", state.userAddress);
    },
    removeUserAddress: (state, action) => {
      state.userAddress = null;
    },
  },
});

export const { setuserAddress, removeUserAddress } = AddressSlice.actions;
export default AddressSlice.reducer;
