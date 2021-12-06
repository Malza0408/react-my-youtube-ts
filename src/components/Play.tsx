import React, { MouseEvent } from "react";
import styles from "./Play.module.css";
import { generateKey } from "../functions/functionBundle";
import * as functions from "../functions/functionBundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { DataType } from "../types";
import VideoCard from "./VideoCard";
import { VideoCardSetting } from "../videoCardSetting";

interface PropsList {
  toggle: boolean;
  toggleDescription: (event: MouseEvent<HTMLButtonElement>) => void;
  toggleName: string;
  video: DataType | null;
  videos: DataType[] | null;
  selectVideo: (video: DataType) => void;
}

const Play: React.FC<PropsList> = ({
  toggle,
  toggleDescription,
  toggleName,
  video,
  videos,
  selectVideo,
}) => {
  return (
    <section className={styles.playVideo}>
      <div className={styles.container}>
        <iframe
          title="playVideo"
          id="ytplayer"
          typeof="text/html"
          src={`https://www.youtube.com/embed/${video && video.id}`}
          allowFullScreen
        ></iframe>
        <section className={styles.title_container}>
          <h2>{video!.snippet.title}</h2>
          <section className={styles.title_metaData}>
            <section className={styles.viewAndDate}>
              <span
                className={styles.viewCount}
              >{`조회수 ${functions.handleViewCountForm(
                video!.statistics.viewCount
              )}회`}</span>
              <span className={styles.publishedAt}>
                {functions.handleDate(video!.snippet.publishedAt)}
              </span>
            </section>
            <section className={styles.icons_container}>
              <div className={styles.icons}>
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  color="white"
                  className={styles.thumb_icon}
                />
                <span>
                  {functions.handleCount(video!.statistics.likeCount)}
                </span>
              </div>
              <div className={styles.icons}>
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  color="white"
                  className={styles.thumb_icon}
                />
                <span>
                  {functions.handleCount(video!.statistics.dislikeCount)}
                </span>
              </div>
            </section>
          </section>
        </section>
        <section className={styles.description_container}>
          <pre className={toggle ? styles.description : styles.show}>
            {video!.snippet.description}
          </pre>
          <button className={styles.showMore} onClick={toggleDescription}>
            {toggleName}
          </button>
        </section>
        <div className={styles.underline}></div>
      </div>
      <div className={styles.videoList}>
        <ul>
          {videos!.map((video) => (
            <li
              className={styles.videoCard}
              key={generateKey(video.snippet.publishedAt)}
              onClick={() => selectVideo(video)}
            >
              <VideoCard
                data={video}
                fontSize={VideoCardSetting.fontSize.small}
                display={VideoCardSetting.display.none}
                description={VideoCardSetting.description.none}
                page={VideoCardSetting.page.playVideo}
                thumbSize={VideoCardSetting.thumbSize.small}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Play;
