import { useEffect } from "react";
import { DataType } from "../types";
import styles from "./Home.module.css";
import { generateKey } from "../functions/functionBundle";
import VideoCard from "./VideoCard";
import { VideoCardSetting } from "../videoCardSetting";

interface DataProps {
  datas: DataType[] | null;
  getMostPopularVideos: () => void;
  selectVideo: (video: DataType) => void;
}

const Home: React.FC<DataProps> = ({
  datas,
  getMostPopularVideos,
  selectVideo,
}) => {
  useEffect(() => {
    getMostPopularVideos();
  }, [getMostPopularVideos]);

  return (
    <>
      <section className={styles.home}>
        <ul className={styles.videoList}>
          {datas?.map((data) => (
            <li
              className={styles.videoCard}
              key={generateKey(data.snippet.publishedAt)}
              onClick={() => selectVideo(data)}
            >
              <VideoCard
                data={data}
                fontSize={VideoCardSetting.fontSize.small}
                display={VideoCardSetting.display.none}
                description={VideoCardSetting.description.none}
                page={VideoCardSetting.page.home}
                thumbSize={VideoCardSetting.thumbSize.medium}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
