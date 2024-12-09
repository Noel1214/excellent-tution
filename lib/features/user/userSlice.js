import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setAdmin } = userSlice.actions;

export default userSlice.reducer;
