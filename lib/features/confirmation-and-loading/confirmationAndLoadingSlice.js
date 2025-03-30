import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoadingScreen: false,
  showConfirmationBox: false,
  isConfirmed: false,
  additionalData: "",
};

export const confirmationAndLoadingSlice = createSlice({
  name: "confirmationAndLoading",
  initialState,
  reducers: {
    setShowLoadingScreen: (state, action) => {
      state.showLoadingScreen = action.payload;
    },
    setShowConfirmationBox: (state, action) => {
      state.showConfirmationBox = action.payload;
    },
    setConfirmed: (state, action) => {
      state.isConfirmed = action.payload;
    },
    setAdditionalData: (state, action) => {
      state.additionalData = action.payload;
    },
  },
});

export const {
  setShowLoadingScreen,
  setShowConfirmationBox,
  setConfirmed,
  setAdditionalData,
} = confirmationAndLoadingSlice.actions;

export default confirmationAndLoadingSlice.reducer;
