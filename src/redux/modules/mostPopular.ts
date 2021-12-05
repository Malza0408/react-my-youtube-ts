import { call, put, takeLatest } from "@redux-saga/core/effects";
import { createActions, handleActions } from "redux-actions";
import YoutubeService, { MAX_RESULT } from "../../services/YoutubeService";
import { DataType, DataState } from "../../types";

const initialState: DataState = {
  videos: null,
  error: null,
};

const prefix = "my-youtube/mostPopular";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

const reducer = handleActions<DataState, DataType[]>(
  {
    PENDING: (state) => ({
      ...state,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      videos: action.payload,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;
export const { getMostpopular } = createActions("GET_MOSTPOPULAR", { prefix });

function* getMostPopularSaga() {
  try {
    yield put(pending());
    const datas: DataType[] = yield call(
      YoutubeService.mostPopular,
      MAX_RESULT
    );
    yield put(success(datas));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

// saga

export function* popularDataSaga() {
  yield takeLatest(`${prefix}/GET_MOSTPOPULAR`, getMostPopularSaga);
}
