import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teacherData: [],
  };

export const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers: {
        setTeacherData: (state, action) => {
            state.teacherData = action.payload
        }
    },
});

export const { setTeacherData } = teacherSlice.actions;

export default teacherSlice.reducer;