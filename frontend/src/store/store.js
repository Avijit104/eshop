import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CustomerSlice from "./Customer/CustomerSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    customer: CustomerSlice,
  },
});

export default store;
