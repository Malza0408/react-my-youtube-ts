import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import mostPopular from "./mostPopular";
import searchId from "./searchId";
import selectVideo from "./selectVideo";

const reducer = (history: History<unknown>) =>
  combineReducers({
    mostPopular,
    searchId,
    selectVideo,
    router: connectRouter(history),
  });

export default reducer;
