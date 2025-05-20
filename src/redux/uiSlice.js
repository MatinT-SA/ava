import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarVisible: false,
  isMobileView: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsSidebarVisible: (state, action) => {
      state.isSidebarVisible = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarVisible = !state.isSidebarVisible;
    },
    setIsMobileView: (state, action) => {
      state.isMobileView = action.payload;
    },
    closeSidebar: (state) => {
      state.isSidebarVisible = false;
    },
  },
});

export const {
  setIsSidebarVisible,
  toggleSidebar,
  setIsMobileView,
  closeSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
