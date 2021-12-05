import React from "react";
import { generateKey } from "../functions/functionBundle";
import { DataType } from "../types";
import { VideoCardSetting } from "../videoCardSetting";
import styles from "./SearchResult.module.css";
import VideoCard from "./VideoCard";

interface PropsList {
  searchResult: DataType[] | null;
  selectVideo: (video: DataType) => void;
}

const SearchResult: React.FC<PropsList> = ({ searchResult, selectVideo }) => {
  return (
    <section className={styles.searchResult}>
      <div className={styles.container}>
        <ul className={styles.videoList}>
          {searchResult?.map((video) => (
            <li
              className={styles.videoCard}
              key={generateKey(video.snippet.publishedAt)}
              onClick={() => selectVideo(video)}
            >
              <VideoCard
                data={video}
                fontSize={VideoCardSetting.fontSize.small}
                display={VideoCardSetting.display.margin}
                description={VideoCardSetting.description.show}
                page={VideoCardSetting.page.searchResult}
                thumbSize={VideoCardSetting.thumbSize.medium}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SearchResult;
