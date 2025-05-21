import { createSlice } from "@reduxjs/toolkit";

const segmentsSlice = createSlice({
  name: "segments",
  initialState: {
    segments: [],
    activeSegmentIndex: 0,
  },
  reducers: {
    setSegments(state, action) {
      state.segments = action.payload;
      // Reset activeSegmentIndex وقتی داده جدید میاد
      state.activeSegmentIndex = 0;
    },
    setActiveSegmentIndex(state, action) {
      state.activeSegmentIndex = action.payload;
    },
  },
});

export const { setSegments, setActiveSegmentIndex } = segmentsSlice.actions;
export default segmentsSlice.reducer;
