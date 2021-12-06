import { delay, put, takeLatest } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { Action, createActions, handleActions } from "redux-actions";
import { DataType, SelectDataState } from "../../types";

const initialState: SelectDataState = {
  video: null,
  error: null,
};

const prefix = "my-youtube/selectVideo";

export const { success, fail } = createActions("SUCCESS", "FAIL", { prefix });

const reducer = handleActions<SelectDataState, DataType>(
  {
    SUCCESS: (state, action) => ({
      video: action.payload,
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

export const { get } = createActions("GET", { prefix });

function* getVideoSaga(video: Action<DataType>) {
  try {
    yield put(success(video.payload));
    yield delay(600);
    yield put(push("/play"));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

// saga
export function* videoDataSaga() {
  yield takeLatest(`${prefix}/GET`, getVideoSaga);
}
