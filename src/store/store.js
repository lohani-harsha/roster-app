import { configureStore } from "@reduxjs/toolkit";
import { companyInfoReducer } from "./reducers";

const store = configureStore({
  reducer: {
    companyInfoState: companyInfoReducer,
  },
});

export default store;
