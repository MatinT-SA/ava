import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLang: "فارسی",
  activeTab: "record",
  linkInput: "",
  uploadedFile: null,
  transcript: null,
  loading: false,
};

const uploaderSlice = createSlice({
  name: "uploader",
  initialState,
  reducers: {
    setSelectedLang(state, action) {
      state.selectedLang = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setLinkInput(state, action) {
      state.linkInput = action.payload;
    },
    setUploadedFile(state, action) {
      state.uploadedFile = action.payload;
    },
    setTranscript(state, action) {
      state.transcript = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearTranscript(state) {
      state.transcript = null;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const {
  setSelectedLang,
  setActiveTab,
  setLinkInput,
  setUploadedFile,
  setTranscript,
  setLoading,
  clearTranscript,
  resetState,
} = uploaderSlice.actions;

export default uploaderSlice.reducer;
