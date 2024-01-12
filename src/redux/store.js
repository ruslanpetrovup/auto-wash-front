import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./slice/sliceUser";

export const store = configureStore({
  reducer: {
    user: reducerUser,
  },
});
