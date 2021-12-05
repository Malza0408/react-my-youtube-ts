import { all } from "redux-saga/effects";
import { popularDataSaga } from "./mostPopular";
import { videosDataSaga } from "./searchId";
import { videoDataSaga } from "./selectVideo";

export default function* rootSaga() {
  yield all([popularDataSaga(), videosDataSaga(), videoDataSaga()]);
}
