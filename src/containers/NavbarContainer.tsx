import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { getVideos, setVideos } from "../redux/modules/searchId";

const NavbarContainer = () => {
  const dispatch = useDispatch();

  const searchVideos = useCallback(
    (query: string | undefined) => {
      dispatch(getVideos(query));
    },
    [dispatch]
  );

  const goHome = useCallback(() => {
    dispatch(setVideos());
  }, [dispatch]);

  return <Navbar handleSubmit={searchVideos} goHome={goHome} />;
};

export default NavbarContainer;
