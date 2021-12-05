import React, { MouseEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Play from "../components/Play";
import { get } from "../redux/modules/selectVideo";
import { DataType, RootState } from "../types";

const PlayContainer = () => {
  const [toggle, setToggle] = useState(true);
  const [toggleName, setToggleName] = useState("더보기");
  const toggleDescription = (event: MouseEvent<HTMLButtonElement>) => {
    setToggle(!toggle);
    const target = event.target as HTMLElement;
    target.innerText === "더보기"
      ? (target.innerText = "간략히")
      : (target.innerText = "더보기");
    setToggleName(target.innerText);
  };

  const video = useSelector<RootState, DataType | null>(
    (state) => state.selectVideo.video
  );

  const videos = useSelector<RootState, DataType[] | null>((state) => {
    if (state.searchId.videos !== null) {
      return state.searchId.videos;
    } else {
      return state.mostPopular.videos;
    }
  });

  const dispatch = useDispatch();
  const selectVideo = useCallback(
    (video) => {
      setTimeout(() => {
        dispatch(get(video));
        setToggle(true);
        setToggleName("더보기");
      }, 500);
    },
    [dispatch]
  );

  return (
    <Play
      toggle={toggle}
      toggleDescription={toggleDescription}
      toggleName={toggleName}
      video={video}
      videos={videos}
      selectVideo={selectVideo}
    />
  );
};

export default PlayContainer;
