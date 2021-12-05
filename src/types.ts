import { RouterState } from "connected-react-router";
import { Reducer } from "react";
import { AnyAction } from "redux";

export interface DataType {
  id: string;
  snippet: {
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
      standard: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
  };
  statistics: {
    dislikeCount: number;
    likeCount: number;
    viewCount: number;
  };
}

export interface DataState {
  videos: DataType[] | null;
  error: Error | null;
}

export interface SelectDataState {
  video: DataType | null;
  error: Error | null;
}

export interface RootState {
  mostPopular: DataState;
  searchId: DataState;
  selectVideo: SelectDataState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}
