import React from "react";
import { useQuery } from "react-query";
import { themoviedbApi } from "../utils/request";
import {
  BACK_PATH,
  CREDITS_URL,
  IMAGE_PATH,
  MOVIE_ID_PLACEHOLDER,
  MOVIE_IMAGES_URL,
  MOVIE_VIDEOS_URL,
} from "../utils/constants";
import { MovieImage } from "../Models/MovieImage";

export default function useMovieVideos(movieId: number) {
  console.log("useVideo fetched");
  return useQuery({
    queryKey: ["video", movieId],
    queryFn: () => {
      const Url = MOVIE_VIDEOS_URL.replace(
        MOVIE_ID_PLACEHOLDER,
        movieId.toString()
      );
      return themoviedbApi.get<MovieImage>(Url).then((a) => a.data);
    },
  });
}
