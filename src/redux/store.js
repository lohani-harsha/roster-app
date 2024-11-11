import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { companyInfoReducer } from "./../redux/companyInfoSlice";
import rootSaga from './sagas';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store with redux-saga middleware
const store = configureStore({
  reducer: {
    companyInfoState: companyInfoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,  // Disable thunk since we're using saga
      serializableCheck: false, // Disable serializable checks for saga actions
    }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;