import React, { memo } from "react";
import { handleCount, handleDate } from "../functions/functionBundle";
import { DataType } from "../types";
import styles from "./MetaData.module.css";

interface PropsList {
  data: DataType;
  fontSize: string;
  display: string;
  description: string;
  page: string;
}

const MetaData: React.FC<PropsList> = memo(
  ({ data, fontSize, display, description, page }) => {
    let metaPos;
    switch (page) {
      case "home":
        metaPos = styles.home;
        break;
      case "searchResult":
        metaPos = styles.searchResult;
        break;
      case "playVideo":
        metaPos = styles.playVideo;
        break;
      default:
        throw new Error("check videoCardSetting!");
    }

    const font = fontSize === `regular` ? styles.regular : styles.small;
    // searchResult 에서 metaData margin 여부
    const displayType =
      display === "margin" ? styles.haveMargin : styles.haveNone;
    const showDescription =
      description === "show" ? styles.show : styles.hidden;

    return (
      <>
        <p className={`${metaPos} ${styles.title}`}>{data.snippet.title}</p>
        <p className={`${styles.channelTitle} ${font} ${displayType}`}>
          {data.snippet.channelTitle}
        </p>
        <p className={`${styles.viewCount} ${font}`}>
          조회수 {`${handleCount(data.statistics.viewCount)}회`}
        </p>
        <p className={`${styles.publishedDate} ${font}`}>
          {handleDate(data.snippet.publishedAt)}
        </p>
        <pre className={`${styles.description} ${showDescription}`}>
          {data.snippet.description}
        </pre>
      </>
    );
  }
);

export default MetaData;
