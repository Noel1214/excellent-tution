import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import teacherReducer from "./features/teacher/teacherSlice";
import reviewReducer from "./features/review/reviewSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
        'user': userReducer,
        'teacher': teacherReducer,
        'review': reviewReducer
    },
  });   
};
