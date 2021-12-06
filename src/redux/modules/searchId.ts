import { call, put, takeLatest } from "@redux-saga/core/effects";
import { push } from "connected-react-router";
import { Action, createActions, handleActions } from "redux-actions";
import YoutubeService, { MAX_RESULT } from "../../services/YoutubeService";
import { DataState, DataType } from "../../types";

const initialState: DataState = {
  videos: null,
  error: null,
};

const prefix = "my-youtube/searchId";

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
export const { getVideos, setVideos } = createActions(
  "GET_VIDEOS",
  "SET_VIDEOS",
  { prefix }
);

function* getVideosSaga(query: Action<string>) {
  try {
    yield put(pending());

    const ids: string = yield call(
      YoutubeService.searchID,
      MAX_RESULT,
      query.payload
    );
    const videos: DataType[] = yield call(YoutubeService.searchVideos, ids);
    yield put(success(videos));
    yield put(push("/searchResult"));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

function* setVideosdefault() {
  try {
    const videos: DataType[] = yield call(
      YoutubeService.mostPopular,
      MAX_RESULT
    );
    yield put(success(videos));
    yield put(push("/"));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN_ERROR")));
  }
}

// saga

export function* videosDataSaga() {
  yield takeLatest(`${prefix}/GET_VIDEOS`, getVideosSaga);
  yield takeLatest(`${prefix}/SET_VIDEOS`, setVideosdefault);
}
