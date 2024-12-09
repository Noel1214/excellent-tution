import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setLoginState: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  },
});

export const { setAdmin, setLoginState } = userSlice.actions;

export default userSlice.reducer;
