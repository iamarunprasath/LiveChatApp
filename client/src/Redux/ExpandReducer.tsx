import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./Store";

export interface ExpandedState {
  value: boolean;
}

const expandedInitialState: ExpandedState = {
  value: false,
};

export const expandSlice = createSlice({
  name: "isExpanded",
  initialState: expandedInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    revert: (state) => {
      state.value = !state.value;
    },
    reset: (state) => {
      state.value = false;
    },
  },
});

export const { revert, reset } = expandSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectExpand = (state: RootState) => state.isExpanded.value;

export default expandSlice.reducer;
