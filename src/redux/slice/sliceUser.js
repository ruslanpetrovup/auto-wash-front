import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

export const sliceUser = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = sliceUser.actions;

export default sliceUser.reducer;
