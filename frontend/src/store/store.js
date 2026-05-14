import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AtuhSlice";
import AddressSlice from "../store/Customer/AddressSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    address: AddressSlice,
  },
});

export default store;
