import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteArchiveItem } from "../services/apiService";

export const loadArchive = createAsyncThunk(
  "archive/loadArchive",
  async (page, { rejectWithValue }) => {
    try {
      const token = "a85d08400c622b50b18b61e239b9903645297196";
      const res = await fetch(`/api/requests?page=${page}`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchArchiveItemDetailsThunk = createAsyncThunk(
  "archive/fetchDetails",
  async (id, { rejectWithValue }) => {
    try {
      const token = "a85d08400c622b50b18b61e239b9903645297196"; // بهتره از جای مطمئن بگیری مثل redux یا localStorage
      const res = await fetch(`/api/requests/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات");
      const data = await res.json();
      return { id, details: data };
    } catch (err) {
      return rejectWithValue({ id, error: err.message });
    }
  },
);

export const deleteArchiveItemThunk = createAsyncThunk(
  "archive/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteArchiveItem(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "خطا در حذف آیتم");
    }
  },
);
const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    results: [],
    count: 0,
    currentPage: 1,
    itemsPerPage: 10,
    isLoading: false,
    error: null,
    itemsDetails: {},
    loading: {},
    errors: {},
  },
  reducers: {
    removeArchiveItem(state, action) {
      delete state.itemsDetails[action.payload];
      delete state.loading[action.payload];
      delete state.errors[action.payload];
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    removeArchiveItemFromResults(state, action) {
      state.results = state.results.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadArchive.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadArchive.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload.count;
        if (state.currentPage === 1) {
          state.results = action.payload.results;
        } else {
          state.results = [...state.results, ...action.payload.results];
        }
        state.error = null;
      })
      .addCase(loadArchive.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchArchiveItemDetailsThunk.pending, (state, action) => {
        state.loading[action.meta.arg] = true;
        state.errors[action.meta.arg] = null;
      })
      .addCase(fetchArchiveItemDetailsThunk.fulfilled, (state, action) => {
        const { id, details } = action.payload;
        state.itemsDetails[id] = details;
        state.loading[id] = false;
        state.errors[id] = null;
      })
      .addCase(fetchArchiveItemDetailsThunk.rejected, (state, action) => {
        const { id, error } = action.payload || {};
        if (id) {
          state.loading[id] = false;
          state.errors[id] = error || "خطا در دریافت جزئیات آیتم";
        }
      })

      .addCase(deleteArchiveItemThunk.fulfilled, (state, action) => {
        const id = action.payload;
        state.results = state.results.filter((item) => item.id !== id);
        delete state.itemsDetails[id];
        delete state.loading[id];
        delete state.errors[id];
      })

      .addCase(deleteArchiveItemThunk.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const selectArchiveItemDetails = (state, id) =>
  state.archive.itemsDetails[id];

export const selectLoading = (state, id) => state.archive.loading[id] || false;

export const selectError = (state, id) => state.archive.errors[id] || null;

export const {
  removeArchiveItem,
  setCurrentPage,
  removeArchiveItemFromResults,
} = archiveSlice.actions;

export default archiveSlice.reducer;
