import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import uploaderReducer from "./uploaderSlice";
import archiveReducer from "./archiveSlice";
import segmentsReducer from "./segmentsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    uploader: uploaderReducer,
    archive: archiveReducer,
    segments: segmentsReducer,
  },
});
