import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCompanyInfoSlice = createSlice({
  name: "companyInfoState",
  initialState: {
    loading: false,
    selectedEmp: null,
    showEmpDetails: false,
  },
  reducers: {
    // ... other reducers ...
    toggleLoadingStateAction: (state, action) => {
      console.log("toggling loading state");
      state.loading = !state.loading;
    },
    setSelectedEmployeeStateAction: (state, action) => {
      state.selectedEmp = action.payload;
    },
    setShowEmpDetailsstateAction: (state, action) => {
      state.showEmpDetails = action.payload;
      if (!action.payload) {
        state.selectedEmp = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfoAction.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchCompanyInfoAction.fulfilled, (state, action) => {
        console.log("fulfilled", action);
        state.loading = false;
        state.companyInfo = action.payload.companyInfo;
        state.employees = action.payload.employees;
        state.errorMessage = null
      })
      .addCase(fetchCompanyInfoAction.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const fetchCompanyInfoAction = createAsyncThunk(
  "companyInfoState/fetchCompanyInfoAction",
  async () => {
    console.log("fetchCompanyInfoAction received");
    try {
      const response = await axios.get("http://localhost:3001/companies");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching data");
    }
  }
);

export const {
  toggleLoadingStateAction,
  setSelectedEmployeeStateAction,
  setShowEmpDetailsstateAction,
} = fetchCompanyInfoSlice.actions;
export const companyInfoReducer = fetchCompanyInfoSlice.reducer;
