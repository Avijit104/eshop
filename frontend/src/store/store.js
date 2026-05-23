import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AtuhSlice";
import AddressSlice from "../store/Customer/AddressSlice";
import BusinesSlice from "../store/seller/BusinessSlice";
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    address: AddressSlice,
    business: BusinesSlice,
  },
});

export default store;
