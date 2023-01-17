import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: { searchText: "", showTextBar: true },
  reducers: {
    search(state, action) {
      const searchText = action.payload;
      state.searchText = searchText;
    },
    searchBarEnable(state) {
      state.showTextBar = true;
    },
    searchBarDisable(state) {
      state.showTextBar = false;
    },
  },
});

export const headerActions = headerSlice.actions;
export default headerSlice;
