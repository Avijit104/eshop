import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AtuhSlice";
import AddressSlice from "./AddressSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    address: AddressSlice,
  },
});

export default store;
