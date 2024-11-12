import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const companyInfoSlice = createSlice({
  name: "companyInfoStateSliceReducer",
  initialState: {
    loading: false,
    selectedEmp: null,
    showEmpDetails: false,
  },
  reducers: {
    // ... other reducers ...
        fetchCompanyInfoRequest: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchCompanyInfoSuccess: (state, action) => {
        state.loading = false;
        state.companyInfo = action.payload.companyInfo;
        state.employees = action.payload.employees;
        state.errorMessage = null
      },
      fetchCompanyInfoFailure: (state, action) => {
        state.errorMessage = action.payload;
        state.loading = false;
      },
    toggleLoadingStateAction: (state, action) => {
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
});



export const {
    fetchCompanyInfoRequest,
    fetchCompanyInfoSuccess,
    fetchCompanyInfoFailure,
  toggleLoadingStateAction,
  setSelectedEmployeeStateAction,
  setShowEmpDetailsstateAction,
} = companyInfoSlice.actions;
export const companyInfoReducer = companyInfoSlice.reducer;
