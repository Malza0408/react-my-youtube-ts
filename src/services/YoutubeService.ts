import axios, { AxiosInstance } from "axios";
import { map } from "lodash";
import { DataType } from "../types";

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
});

export const MAX_RESULT = 5;

export default class YoutubeService {
  public static async mostPopular(maxResults: number): Promise<DataType[]> {
    const response = await httpClient.get("videos", {
      params: {
        part: "id,snippet,statistics",
        chart: "mostPopular",
        maxResults,
        fields:
          "items(snippet(title, thumbnails, channelTitle, publishedAt, description),statistics(viewCount, likeCount, dislikeCount), id)",
      },
    });

    return response?.data?.items;
  }

  public static async searchID(
    maxResults: number,
    query: string
  ): Promise<string> {
    const response = await httpClient.get("search", {
      params: {
        part: "id",
        maxResults,
        q: query,
        fields: "items(id(videoId))",
      },
    });
    return map(response?.data?.items, "id.videoId").join();
  }

  public static async searchVideos(videoList: string): Promise<DataType[]> {
    const response = await httpClient.get("videos", {
      params: {
        part: "id,snippet,statistics",
        fields:
          "items(snippet(title, thumbnails, channelTitle, publishedAt, description),statistics(viewCount, likeCount, dislikeCount),id)",
        id: videoList,
      },
    });

    return response?.data?.items;
  }
}
