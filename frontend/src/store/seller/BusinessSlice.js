import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessDetails: [],
};

const BusinessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusiness: (state, action) => {
      state.businessDetails = action.payload;
    },
    unsetBusiness: (state, action) => {
      state.businessDetails = [];
    },
  },
});

export const { setBusiness, unsetBusiness } = BusinessSlice.actions;
export default BusinessSlice.reducer;
