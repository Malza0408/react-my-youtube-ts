import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import history from "../history";
import { getVideos } from "../redux/modules/searchId";

const NavbarContainer = () => {
  const dispatch = useDispatch();

  const searchVideos = useCallback(
    (query: string | undefined) => {
      dispatch(getVideos(query));
    },
    [dispatch]
  );

  const goHome = useCallback(() => {
    history.push("/");
  }, []);

  return <Navbar handleSubmit={searchVideos} goHome={goHome} />;
};

export default NavbarContainer;
