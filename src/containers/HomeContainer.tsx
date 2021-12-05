import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../components/Home";
import { getMostpopular } from "../redux/modules/mostPopular";
import { get } from "../redux/modules/selectVideo";
import { DataType, RootState } from "../types";

const HomeContainer = () => {
  const datas = useSelector<RootState, DataType[] | null>(
    (state) => state.mostPopular.videos
  );
  const dispatch = useDispatch();

  const getMostPopularVideos = useCallback(() => {
    dispatch(getMostpopular());
  }, [dispatch]);

  const selectVideo = useCallback(
    (video) => {
      dispatch(get(video));
    },
    [dispatch]
  );

  return (
    <Home
      datas={datas}
      getMostPopularVideos={getMostPopularVideos}
      selectVideo={selectVideo}
    />
  );
};

export default HomeContainer;
