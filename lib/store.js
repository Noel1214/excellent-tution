import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import teacherReducer from "./features/teacher/teacherSlice";


export const makeStore = () => {
  return configureStore({
    reducer: {
        'user': userReducer,
        'teacher': teacherReducer
    },
  });   
};
