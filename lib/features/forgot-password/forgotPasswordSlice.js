import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
