import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isLoggedIn: false,
  id: "",
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
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  },
});

export const { setAdmin, setLoginState, setId } = userSlice.actions;

export default userSlice.reducer;
