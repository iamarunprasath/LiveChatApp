import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

export interface UserListItem {
  username: string;
  userId: string;
  socketID: string;
}
export interface UserListState {
  userList: UserListItem[];
}

const userListInitialState: UserListState = {
  userList: [],
};

export const userListSlice = createSlice({
  name: "userList",
  initialState: userListInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserList: (state, action: PayloadAction<UserListItem[]>) => {
      state.userList = action.payload;
    },
    clearUserList: () => userListInitialState,
  },
});
export const { setUserList, clearUserList } = userListSlice.actions;

export const selectUserList = (state: RootState) => state.userList;

export default userListSlice.reducer;
