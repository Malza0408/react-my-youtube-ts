import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchResult from "../components/SearchResult";
import history from "../history";
import { get } from "../redux/modules/selectVideo";
import { DataType, RootState } from "../types";

const SearchResultContainer = () => {
  const dispatch = useDispatch();
  const videos = useSelector<RootState, DataType[] | null>(
    (state) => state.searchId.videos
  );

  const selectVideo = useCallback(
    (video) => {
      dispatch(get(video));
    },
    [dispatch]
  );

  return <SearchResult searchResult={videos} selectVideo={selectVideo} />;
};

export default SearchResultContainer;
