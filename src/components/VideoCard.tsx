import React, { memo } from "react";
import { DataType } from "../types";
import MetaData from "./MetaData";
import styles from "./VideoCard.module.css";

interface PropsList {
  data: DataType;
  fontSize: string;
  display: string;
  description: string;
  page: string;
  thumbSize: string;
}

const VideoCard: React.FC<PropsList> = memo(
  ({ data, fontSize, display, description, page, thumbSize }) => {
    let cardPos;
    switch (page) {
      case "home":
        cardPos = styles.home;
        break;
      case "searchResult":
        cardPos = styles.searchResult;
        break;
      case "playVideo":
        cardPos = styles.playVideo;
        break;
      default:
        throw new Error("check videoCardSetting!");
    }

    const size =
      thumbSize && thumbSize === "small"
        ? styles.thumbSizeSmall
        : styles.thumbSizeMedium;

    return (
      <>
        <article className={`${cardPos}`}>
          <img
            className={`${size}`}
            src={data.snippet.thumbnails.medium.url}
            alt="video_thumbnail"
          />
          <div className={styles.metaData}>
            <MetaData
              data={data}
              fontSize={fontSize}
              display={display}
              description={description}
              page={page}
            />
          </div>
        </article>
      </>
    );
  }
);

export default VideoCard;
