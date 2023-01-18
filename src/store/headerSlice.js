import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "header",
  initialState: { searchText: "", showSearchBar: true },
  reducers: {
    search(state, action) {
      const searchText = action.payload;
      state.searchText = searchText;
    },
    showSearchBar(state) {
      state.showSearchBar = true;
    },
    hideSearchBar(state) {
      state.showSearchBar = false;
    },
  },
});

export const headerActions = headerSlice.actions;
export default headerSlice;
