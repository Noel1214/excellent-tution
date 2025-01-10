import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviewsData: [],
};

export const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        setReviewsData: (state, action) => {
            state.reviewsData = action.payload
        }
    }
});

export const { setReviewsData } = reviewSlice.actions

export default reviewSlice.reducer