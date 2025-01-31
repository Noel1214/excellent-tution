import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import teacherReducer from "./features/teacher/teacherSlice";
import reviewReducer from "./features/review/reviewSlice";
import forgotPasswordReducer from "./features/forgot-password/forgotPasswordSlice";
import confirmationAndLoadingSlice from "./features/confirmation-and-loading/confirmationAndLoadingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      teacher: teacherReducer,
      review: reviewReducer,
      forgotPassword: forgotPasswordReducer,
      displayConfirmAndLoading: confirmationAndLoadingSlice,
    },
  });
};
