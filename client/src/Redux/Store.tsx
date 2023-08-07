import { configureStore } from "@reduxjs/toolkit";
import expandReducer from "./ExpandReducer";
import userListReducer from "./UserListReducer";
import customAsyncMiddleware from "./CustomAsyncMiddleware";

export const store = configureStore({
  reducer: {
    isExpanded: expandReducer,
    userList: userListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customAsyncMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
