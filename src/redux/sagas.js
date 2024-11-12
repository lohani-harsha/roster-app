import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchCompanyInfoRequest,fetchCompanyInfoSuccess,fetchCompanyInfoFailure} from './companyInfoSlice';

// Simulate an API call
const fetchCompanyInfoFromAPI = async () => {
  const response = await fetch('http://localhost:3001/companies');
  if (!response.ok) throw new Error('Failed to fetch company Info');
  return response.json();
};

// Worker saga: makes the API call when the etchCompanyInfoRequest action is dispatched
function* fetchCompanyInfoSaga() {
  try {
    const companyInfo  = yield call(fetchCompanyInfoFromAPI); // Call the API
    yield put(fetchCompanyInfoSuccess(companyInfo )); // Dispatch success action
  } catch (error) {
    yield put(fetchCompanyInfoFailure(error.message)); // Dispatch failure action
  }
}

function* watchFetchCompanyInfoRequest() {
  yield takeEvery( fetchCompanyInfoRequest.type, fetchCompanyInfoSaga);
}

export default watchFetchCompanyInfoRequest;