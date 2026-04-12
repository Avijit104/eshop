import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AtuhSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default store;
